import { Injectable } from '@angular/core';
import { ClassDetailsResponse } from 'src/app/models/class/class-details.response';
import { TeacherClassResponse } from 'src/app/models/class/teacher-class.response';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends GeneralService {
  getClassesForUser(url: string = "class/Classes") {
    return this.sendGetRequest<TeacherClassResponse[]>(url, {"auth": "strict"})
  }

  getClass(id: string, url: string = "class/Classes/") {
    return this.sendGetRequest<ClassDetailsResponse>(url + id, {"aith": "strict"});
  }
}
