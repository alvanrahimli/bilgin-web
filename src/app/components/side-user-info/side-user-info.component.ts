import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models/user/response/user-response';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-side-user-info',
  templateUrl: './side-user-info.component.html',
  styleUrls: ['./side-user-info.component.css']
})
export class SideUserInfoComponent implements OnInit {

  constructor(private accountService: AccountService) { }

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
  }
}
