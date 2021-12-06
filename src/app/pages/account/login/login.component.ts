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
    let phoneNumber = `+994${this.phoneRequest.phoneNumber}`;
    let loginResponse = await this.accountService.postLoginPhone({phoneNumber: phoneNumber});
    if (loginResponse.hasError) {
      console.log("error occured", loginResponse.error);
    } else {
      this.router.navigate(['/account', 'login', 'otp'], {queryParams: {
        phone: phoneNumber,
        returnUrl: this.returnUrl,
      }});
    }
  }
}
