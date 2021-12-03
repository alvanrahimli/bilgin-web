import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponse } from 'src/app/models/user/response/user-response';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // TODO: Implement correct way to subscribe to shared data service
  private userResponseMessageSource: BehaviorSubject<UserResponse> | undefined;

  constructor(private accountService: AccountService) { }

  async getUserData(): Promise<Observable<UserResponse> | undefined> {
    if (this.userResponseMessageSource === undefined) {
      let userResponse = await this.accountService.getUserInfo();
      debugger;
      if (!userResponse.hasError) {
        this.userResponseMessageSource = new BehaviorSubject<UserResponse>(userResponse.data);
      }
    }

    return this.userResponseMessageSource?.asObservable();
  }
}
