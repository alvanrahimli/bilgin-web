import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private accountService: AccountService,
    public activatedRoute: ActivatedRoute,
    public router: Router) { }

  isLoggedIn: boolean = false;
  userData: UserResponse | any;

  async ngOnInit(): Promise<void> {
    let userResponse = await this.accountService.getUserInfo(false);
    if (userResponse.hasError) {
      console.error("ERROR:", userResponse.error);
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.userData = userResponse.data;
    }
  }
}
