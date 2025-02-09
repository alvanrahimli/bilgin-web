import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PhoneRequest } from 'src/app/models/user/request/phone-request';
import { AccountService } from 'src/app/services/account/account.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  statusIndicator: StatusIndicator = new StatusIndicator();
  phoneRequest: PhoneRequest = {} as PhoneRequest;
  userAgreed: boolean = false;
  returnUrl: string | undefined;

  async ngOnInit(): Promise<void> {
    let params = await firstValueFrom(this.activatedRoute.queryParams);
    this.returnUrl = params["returnUrl"];
  }

  async onSubmit(): Promise<void> {
    this.statusIndicator.setProgress();
    if (!this.userAgreed) {
      this.statusIndicator.setError("Qaydalar və şərtlərlə razılaşmamısınız");
      return;
    }
    
    let registerResult = await this.accountService.postRegisterPhone({phoneNumber: this.phoneRequest.phoneNumber});
    if (registerResult.hasError) {
      // TODO: Handle errors
      if (registerResult.error instanceof HttpErrorResponse) {
        switch (registerResult.error.status) {
          case 409:
            this.statusIndicator.setError("Nömrəyə bağlı hesab mövcuddur");
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
      this.router.navigate(['/auth', 'register', 'otp'], {queryParams: {
        phone: this.phoneRequest.phoneNumber,
        returnUrl: this.returnUrl,
        t: "register",
      }});
    }
  }

}
