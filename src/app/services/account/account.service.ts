import { Injectable } from '@angular/core';
import { PhoneCodeRequest } from 'src/app/models/user/request/phone-code-request';
import { PhoneRequest } from 'src/app/models/user/request/phone-request';
import { RefreshTokenRequest } from 'src/app/models/user/request/refresh-token-request';
import { StudentInfoRequest } from 'src/app/models/user/request/student-info.request';
import { UserInfoRequest } from 'src/app/models/user/request/user-info-request';
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

  postRegisterPhone(phoneNumber: PhoneRequest, url: string = "identity/Auth/register") {
    return this.sendPostRequest<PhoneRequest, any>(phoneNumber, url, {"auth": "none"});
  }

  postLoginVerify(phoneCodeRequest: PhoneCodeRequest, url: string = "identity/Auth/verify-login") {
    return this.sendPostRequest<PhoneCodeRequest, UserTokenResponse>(phoneCodeRequest, url, {"auth": "none"});
  }

  postRegisterVerify(phoneCodeRequest: PhoneCodeRequest, url: string = "identity/Auth/verify-register") {
    return this.sendPostRequest<PhoneCodeRequest, UserTokenResponse>(phoneCodeRequest, url, {"auth": "none"});
  }

  getAccessToken(refreshToken: string, url: string = "identity/Auth/renew-token") {
    return this.sendPostRequest<RefreshTokenRequest, TokenResponse>({refreshToken: refreshToken}, url, {"auth": "none"});
  }

  putAccountInfo(info: UserInfoRequest, url: string = "identity/Account") {
    return this.sendPutRequest<UserInfoRequest, any>(info, url);
  }

  postStudentInfo(info: StudentInfoRequest, url: string = "identity/Account/add-student-info") {
    return this.sendPostRequest<StudentInfoRequest, any>(info, url);
  }

  getUserInfo(strict: boolean = false, url: string = "identity/Account") {
    if (strict) {
      return this.sendGetRequest<UserResponse>(url, {"auth": "strict"});
    } else {
      return this.sendGetRequest<UserResponse>(url);
    }
  }

  persistToken(tokens: TokenResponse): void {
    localStorage.setItem("refresh_token", tokens.refreshToken);
    localStorage.setItem("access_token", tokens.accessToken);
  }

  logout(): void {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
  }

  getPersistedToken(): TokenResponse {
    return {
      refreshToken: localStorage.getItem("refresh_token") ?? "",
      accessToken: localStorage.getItem("access_token") ?? ""
    };
  }
}
