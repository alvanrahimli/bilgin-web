import { Component, OnInit } from '@angular/core';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { TestSubjectsService } from 'src/app/services/tests/test-subjects/test-subjects.service';

@Component({
  selector: 'app-test-subjects',
  templateUrl: './test-subjects.component.html',
  styleUrls: ['./test-subjects.component.css']
})
export class TestSubjectsComponent implements OnInit {

  subjectList: SubjectResponse[] = [];

  constructor(private subjectsService: TestSubjectsService) { }

  async ngOnInit(): Promise<void> {
    this.loadSubjectList();
  }

  async loadSubjectList(): Promise<void> {
    let sListResponse = await this.subjectsService.getSubjectList();

    if (sListResponse.hasError) {
      console.log("ERROR while load subject list:", sListResponse.error);
    } else {
      this.subjectList = sListResponse.data;
      console.log(sListResponse);
    }
  }
}
