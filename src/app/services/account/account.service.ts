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
    return this.sendPostRequest<PhoneRequest, any>(phoneNumber, url, {"auth": "none"});
  }

  postLoginVerify(phoneCodeRequest: PhoneCodeRequest, url: string = "identity/Auth/verify-login") {
    return this.sendPostRequest<PhoneCodeRequest, UserTokenResponse>(phoneCodeRequest, url, {"auth": "none"});
  }

  getAccessToken(refreshToken: string, url: string ="identity/Auth/renew-token") {
    return this.sendPostRequest<RefreshTokenRequest, TokenResponse>({refreshToken: refreshToken}, url, {"auth": "none"});
  }

  getUserInfo(url: string = "identity/Account") {
    return this.sendGetRequest<UserResponse>(url);
  }

  persistToken(tokens: TokenResponse): void {
    localStorage.setItem("refresh_token", tokens.refreshToken);
    localStorage.setItem("access_token", tokens.accessToken);
  }

  getPersistedToken(): TokenResponse {
    return {
      refreshToken: localStorage.getItem("refresh_token") ?? "",
      accessToken: localStorage.getItem("access_token") ?? ""
    };
  }
}
