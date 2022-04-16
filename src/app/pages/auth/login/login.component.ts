import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PhoneRequest } from 'src/app/models/user/request/phone-request';
import { AccountService } from 'src/app/services/account/account.service';
import { Status, StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  phoneRequest: PhoneRequest = {} as PhoneRequest;
  returnUrl: string | undefined;
  statusIndicator: StatusIndicator = new StatusIndicator();

  async ngOnInit(): Promise<void> {
    let params = await firstValueFrom(this.activatedRoute.queryParams);
    this.returnUrl = params["returnUrl"];
  }

  async submitLogin() {
    console.log(this.phoneRequest.phoneNumber);
    this.statusIndicator.setProgress();
    let loginResponse = await this.accountService.postLoginPhone({phoneNumber: this.phoneRequest.phoneNumber});
    if (loginResponse.hasError) {
      console.log("error occured", loginResponse.error);
      if (loginResponse.error instanceof HttpErrorResponse) {
        switch (loginResponse.error.status) {
          case 404:
            this.statusIndicator.setError("İstifadəçi tapılmadı");
            break;
        
          default:
            this.statusIndicator.setError();
            break;
        }
      } else {
        this.statusIndicator.setError();
      }
    } else {
      this.statusIndicator.setCompleted();
      this.router.navigate(['/auth', 'login', 'otp'], {queryParams: {
        phone: this.phoneRequest.phoneNumber,
        returnUrl: this.returnUrl,
        t: "login",
      }});
    }
  }
}
