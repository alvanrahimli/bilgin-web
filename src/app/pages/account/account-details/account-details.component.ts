import { Component, OnInit } from '@angular/core';
import { SchoolResponse } from 'src/app/models/shared/school.response';
import { UserResponse } from 'src/app/models/user/response/user-response';
import { AccountService } from 'src/app/services/account/account.service';
import { SchoolsService } from 'src/app/services/schools/schools-service.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  constructor(private accountService: AccountService,
    private schoolsService: SchoolsService) { }

  status: StatusIndicator = new StatusIndicator();
  userInfo: UserResponse | null = null;
  schools: SchoolResponse[] = [];

  async ngOnInit(): Promise<void> {
    this.status.setProgress();

    let accountResponse = await this.accountService.getUserInfo(true);
    if (accountResponse.hasError) {
      this.status.setError("Səhv baş verdi");
    } else {
      this.userInfo = accountResponse.data;
      if (accountResponse.data.studentInfo?.school == null && accountResponse.data.teacherInfo?.school == null) {
        this.schools = await this.getSchools();
      }
      this.status.setCompleted();
    }
  }

  async getSchools(): Promise<SchoolResponse[]> {
    let schoolsResponse = await this.schoolsService.getSchools();
    if (!schoolsResponse.hasError) {
      return schoolsResponse.data;
    } else {
      return [];
    }
  }

  getRoles(): string {
    return this.userInfo?.roles.map(r => r.name).join(', ') ?? 'Yoxdur';
  }
}
