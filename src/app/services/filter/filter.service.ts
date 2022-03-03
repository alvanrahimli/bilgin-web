import { Injectable } from '@angular/core';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { GradeResponse } from 'src/app/models/user/response/grade.response';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService extends GeneralService {

  getGrades() {
    return this.sendGetRequest<GradeResponse[]>("tests/Filter/grades");
  }

  getSubjects() {
    return this.sendGetRequest<SubjectResponse[]>("tests/Filter/subjects");
  }

  getParagraphs(subjectId: string) {
    return this.sendGetRequest<SubjectResponse[]>(`tests/Filter/paragraphs?subjectId=${subjectId}`);
  }
}
