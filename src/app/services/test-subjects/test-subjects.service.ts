import { Injectable } from '@angular/core';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class TestSubjectsService extends GeneralService {
  getSubjectList(url: string = "subjects/") {
    return this.sendGetRequest<SubjectResponse[]>(url);
  }
}
