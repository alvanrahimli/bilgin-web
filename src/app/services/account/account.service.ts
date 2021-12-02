import { Injectable } from '@angular/core';
import { PhoneCodeRequest } from 'src/app/models/user/request/phone-code-request';
import { PhoneRequest } from 'src/app/models/user/request/phone-request';
import { RefreshTokenRequest } from 'src/app/models/user/request/refresh-token-request';
import { TokenResponse } from 'src/app/models/user/response/token-response';
import { UserResponse } from 'src/app/models/user/response/user-response';
import { UserTokenResponse } from 'src/app/models/user/response/user-token-response';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends GeneralService {
  postLoginPhone(phoneNumber: PhoneRequest, url: string = "identity/Auth/login") {
    return this.sendPostRequest<PhoneRequest, any>(phoneNumber, url, {"skip": "true"});
  }

  postLoginVerify(phoneCodeRequest: PhoneCodeRequest, url: string = "identity/Auth/verify-login") {
    return this.sendPostRequest<PhoneCodeRequest, UserTokenResponse>(phoneCodeRequest, url, {"skip": "true"});
  }

  getAccessToken(refreshToken: string, url: string ="identity/Auth/renew-token") {
    return this.sendPostRequest<RefreshTokenRequest, TokenResponse>({refreshToken: refreshToken}, url, {"skip": "true"});
  }

  getUserInfo(url: string = "identity/Account") {
    return this.sendGetRequest<UserResponse>(url);
  }

  persistToken(tokens: TokenResponse): void {
    localStorage.setItem("refresh_token", tokens.refreshToken);
    localStorage.setItem("access_token", tokens.accessToken);
  }
}
