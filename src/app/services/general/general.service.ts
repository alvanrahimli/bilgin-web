import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService extends BaseService {
  public async sendPostRequest<REQ_TYPE, RES_TYPE>(request: REQ_TYPE, url: string, headers: any = {}) {
    return await this.post<RES_TYPE>(url, request, headers);
  }

  public async sendPutRequest<REQ_TYPE, RES_TYPE>(request: REQ_TYPE, url: string, headers: any = {}) {
    return await this.put<RES_TYPE>(url, request, headers);
  }

  public async sendDeleteRequest<RES_TYPE>(url: string) {
    return await this.delete<RES_TYPE>(url);
  }

  public async sendGetRequest<RES_TYPE>(url: string, headers: any = {}) {
    return await this.get<RES_TYPE>(url);
  }
}
