import { Injectable } from '@angular/core';
import { BannerResponse } from 'src/app/models/homepage/banner.response';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService extends GeneralService {

  async getBanners(url: string = "misc/homepage/all") {
    return this.sendGetRequest<BannerResponse[]>(url);
  }
}
