import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserInfoRequest } from 'src/app/models/user/request/user-info-request';
import { AccountService } from 'src/app/services/account/account.service';
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
  firstName: string = "";
  lastName: string = "";

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
}
