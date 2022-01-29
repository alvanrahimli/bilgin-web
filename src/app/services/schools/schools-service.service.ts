import { Injectable } from '@angular/core';
import { SchoolResponse } from 'src/app/models/shared/school.response';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService extends GeneralService {
  getSchools(url: string = "class/schools") {
    return this.sendGetRequest<SchoolResponse[]>(url, {"auth": "none"});
  }
}
