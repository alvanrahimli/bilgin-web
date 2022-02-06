import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BaseModelResponse } from 'src/app/models/base-model/response/base-model';
import { SchoolResponse } from 'src/app/models/shared/school.response';
import { StudentInfoRequest } from 'src/app/models/user/request/student-info.request';
import { UserInfoRequest } from 'src/app/models/user/request/user-info-request';
import { AccountService } from 'src/app/services/account/account.service';
import { SchoolsService } from 'src/app/services/schools/schools-service.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  statusIndicator: StatusIndicator = new StatusIndicator();
  returnUrl: string | undefined;
  infoRequest: UserInfoRequest = {} as UserInfoRequest;
  userType: string = "student";
  firstName: string = "";
  lastName: string = "";
  schoolId: string | any = "none";

  async ngOnInit(): Promise<void> {
    let params = await firstValueFrom(this.activatedRoute.queryParams);
    this.returnUrl = params["returnUrl"];
  }

  async onSubmit(): Promise<void> {
    this.statusIndicator.setProgress();
    this.infoRequest.fullName = `${this.firstName} ${this.lastName}`;
    // Submit AccountInfo
    let infoResponse = await this.accountService.putAccountInfo(this.infoRequest);
    if (infoResponse.hasError) {
      this.statusIndicator.setError();
      return;
    }

    this.statusIndicator.setCompleted();
    this.router.navigate(this.returnUrl ? [this.returnUrl] : ['/']);
  }

  chooseUserType(type: string) {
    this.userType = type;
  }
}
