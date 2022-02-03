import { Injectable } from '@angular/core';
import { BannerResponse } from 'src/app/models/homepage/banner.response';
import { StatusResponse } from 'src/app/models/homepage/status.response';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService extends GeneralService {

  getBanners(url: string = "misc/homepage/banners") {
    return this.sendGetRequest<BannerResponse[]>(url);
  }

  getStatus(url: string = "misc/homepage/status") {
    return this.sendGetRequest<StatusResponse>(url);
  }
}
