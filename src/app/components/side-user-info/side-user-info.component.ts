import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserResponse } from 'src/app/models/user/response/user-response';
import { AccountService } from 'src/app/services/account/account.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-side-user-info',
  templateUrl: './side-user-info.component.html',
  styleUrls: ['./side-user-info.component.css']
})
export class SideUserInfoComponent implements OnInit {

  constructor(private accountService: AccountService) { }
  // constructor(private sharedDataService: SharedDataService) { }

  isLoggedIn: boolean = false;
  userData: UserResponse | any;

  async ngOnInit(): Promise<void> {
    let userResponse = await this.accountService.getUserInfo();
    if (userResponse.hasError) {
      console.error("ERROR:", userResponse.error);
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.userData = userResponse.data;
    }
    // let userData = await this.sharedDataService.getUserData();
    // if (userData == undefined) {
    //   this.isLoggedIn = false;
    // } else {
    //   let data = await firstValueFrom(userData);
    //   this.userData = data;
    // }
  }
}
