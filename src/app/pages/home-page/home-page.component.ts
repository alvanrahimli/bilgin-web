import { Component, OnInit } from '@angular/core';
import { BannerResponse } from 'src/app/models/homepage/banner.response';
import { HomePageService } from 'src/app/services/homepage/home-page.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private homePageService: HomePageService) { }

  status: StatusIndicator = new StatusIndicator();
  banners: BannerResponse[] = [];

  async ngOnInit(): Promise<void> {
    this.status.setProgress("Məlumatlar əldə edilir...");

    let bannersResponse = await this.homePageService.getBanners();
    if (!bannersResponse.hasError) {
      this.banners = bannersResponse.data;
      this.status.setCompleted();
    } else {
      this.status.setError();
    }
  }

}
