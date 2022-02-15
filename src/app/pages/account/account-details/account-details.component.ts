import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseModelResponse } from 'src/app/models/base-model/response/base-model';
import { UserRoleType } from 'src/app/models/enums/user-role';
import { SchoolResponse } from 'src/app/models/shared/school.response';
import { StudentInfoRequest } from 'src/app/models/user/request/student-info.request';
import { TeacherInfoRequest } from 'src/app/models/user/request/teacher-info.request';
import { UserResponse } from 'src/app/models/user/response/user-response';
import { AccountService } from 'src/app/services/account/account.service';
import { SchoolsService } from 'src/app/services/schools/schools-service.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit, AfterViewChecked {

  UserRoleType = UserRoleType;

  constructor(private accountService: AccountService,
    private schoolsService: SchoolsService) { }

  status: StatusIndicator = new StatusIndicator();
  userInfo: UserResponse | null = null;
  schools: SchoolResponse[] = [];
  roleType: UserRoleType = UserRoleType.Student;
  studentInfoRequest: StudentInfoRequest = {} as StudentInfoRequest;
  teacherInfoRequest: TeacherInfoRequest = {} as TeacherInfoRequest;

  async ngOnInit(): Promise<void> {
    this.status.setProgress();

    let accountResponse = await this.accountService.getUserInfo(true);
    if (accountResponse.hasError) {
      this.status.setError("Səhv baş verdi");
    } else {
      this.userInfo = accountResponse.data;
      if (accountResponse.data.studentInfo?.school == null && accountResponse.data.teacherInfo?.school == null) {
        this.schools = await this.getSchools();
        this.roleType = UserRoleType.None;
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

  async submitInfo() {
    this.status.setProgress("Yadda saxlanılır...");
    let response: BaseModelResponse<any> = {} as BaseModelResponse<any>;
    if (this.roleType == UserRoleType.Student) {
      response = await this.accountService.postStudentInfo(this.studentInfoRequest);
    } else if (this.roleType == UserRoleType.Teacher) {
      response = await this.accountService.postTeacherInfo(this.teacherInfoRequest);
    }

    if (!response?.hasError) {
      this.status.setCompleted();
      await this.ngOnInit();
    }
  }

  changeType(type: UserRoleType): void {
    this.roleType = type;
  }

  getAccountType(): string {
    if (this.userInfo?.studentInfo == null && this.userInfo?.teacherInfo != null) {
      return "Müəllim";
    } else if (this.userInfo?.studentInfo != null) {
      return "Şagird";
    } else {
      return "Seçilməyib";
    }
  }

  getRoles(): string {
    return this.userInfo?.roles.map(r => r.name).join(', ') ?? 'Yoxdur';
  }

  ngAfterViewChecked() {
    $(".school-select").selectpicker();
  }
}
