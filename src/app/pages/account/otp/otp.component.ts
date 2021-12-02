import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PhoneCodeRequest } from 'src/app/models/user/request/phone-code-request';
import { UserResponse } from 'src/app/models/user/response/user-response';
import { AccountService } from 'src/app/services/account/account.service';

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

  async ngOnInit(): Promise<void> {
    let params = await firstValueFrom(this.activatedRoute.queryParams);
    this.phoneCodeRequest.phoneNumber = params["phone"];
    this.returnUrl = params["returnUrl"];
  }

  async submitLoginVerify() {
    let verifyResponse = await this.accountService.postLoginVerify(this.phoneCodeRequest);
    if (verifyResponse.hasError) {
      console.log("ERROR:", verifyResponse.error);
      // TODO: Show error to user
    } else {
      this.accountService.persistToken(verifyResponse.data.token);
      if (this.returnUrl) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.router.navigate(["/"]);
      }
    }
  }
}
