import { Component, OnInit } from '@angular/core';
import { BannerResponse } from 'src/app/models/homepage/banner.response';
import { StatusResponse } from 'src/app/models/homepage/status.response';
import { HomePageService } from 'src/app/services/homepage/home-page.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private homePageService: HomePageService) { }

  statusIndicator: StatusIndicator = new StatusIndicator();
  
  status: StatusResponse = {} as StatusResponse;
  banners: BannerResponse[] = [];

  async ngOnInit(): Promise<void> {
    this.statusIndicator.setProgress("Məlumatlar əldə edilir...");

    let statusResponse = await this.homePageService.getStatus();
    if (!statusResponse.hasError) {
      this.status = statusResponse.data;
    }

    let bannersResponse = await this.homePageService.getBanners();
    if (!bannersResponse.hasError) {
      this.banners = bannersResponse.data;
    }
    
    if (bannersResponse.hasError && statusResponse.hasError) {
      this.statusIndicator.setError("Məlumatlar əldə oluna bilmədi");
    } else {
      this.statusIndicator.setCompleted();
    }
  }

}
