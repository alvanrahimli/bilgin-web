import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PhoneCodeRequest } from 'src/app/models/user/request/phone-code-request';
import { UserResponse } from 'src/app/models/user/response/user-response';
import { BaseModelResponse } from 'src/app/models/base-model/response/base-model';
import { UserTokenResponse } from 'src/app/models/user/response/user-token-response';
import { AccountService } from 'src/app/services/account/account.service';
import { Status, StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute) { }

  phoneCodeRequest: PhoneCodeRequest = {} as PhoneCodeRequest;

  loggedInUser: string = "";
  returnUrl: string | any;
  requestType: string = "login";
  statusIndicator: StatusIndicator = new StatusIndicator();
  verifyResponse: BaseModelResponse<UserTokenResponse> | any;

  async ngOnInit(): Promise<void> {
    let params = await firstValueFrom(this.activatedRoute.queryParams);
    this.phoneCodeRequest.phoneNumber = params["phone"];
    this.returnUrl = params["returnUrl"];
    this.requestType = params["t"];
  }

  async submitLoginVerify() {
    this.statusIndicator.setProgress();
    if (this.requestType == "login") {
      this.verifyResponse = await this.accountService.postLoginVerify(this.phoneCodeRequest);
    } else if (this.requestType == "register") {
      this.verifyResponse = await this.accountService.postRegisterVerify(this.phoneCodeRequest);
    } else {
      this.statusIndicator.setError("Səhv baş verdi");
    }
    
    if (this.verifyResponse.hasError) {
      console.log("ERROR:", this.verifyResponse.error);
      this.statusIndicator.setError();
      if (this.verifyResponse.error instanceof HttpErrorResponse) {
        if (this.verifyResponse.error.status == 400) {
          this.statusIndicator.setError("Yanlış kod daxil etmisiniz");
        }
      }
    } else {
      this.statusIndicator.setCompleted();
      this.accountService.persistToken(this.verifyResponse.data.token);
      if (this.requestType == "register") {
        this.router.navigate(['/account', 'register', 'user-info'], {queryParams: {
          returnUrl: this.returnUrl,
          phone: this.phoneCodeRequest.phoneNumber,
        }});
      } else {
        if (this.returnUrl) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(["/"]);
        }
      }
    }
    // this.statusIndicator.setError();
  }
}
