import { Component, OnInit } from '@angular/core';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { TestSubjectsService } from 'src/app/services/tests/test-subjects/test-subjects.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-test-subjects',
  templateUrl: './test-subjects.component.html',
  styleUrls: ['./test-subjects.component.css']
})
export class TestSubjectsComponent implements OnInit {
  constructor(private subjectsService: TestSubjectsService) { }
  
  statusIndicator = new StatusIndicator();
  subjectList: SubjectResponse[] = [];

  async ngOnInit(): Promise<void> {
    this.loadSubjectList();
  }

  async loadSubjectList(): Promise<void> {
    this.statusIndicator.setProgress();
    let sListResponse = await this.subjectsService.getSubjectList();

    if (sListResponse.hasError) {
      console.log("ERROR while load subject list:", sListResponse.error);
      this.statusIndicator.setError();
    } else {
      this.statusIndicator.setCompleted();
      this.subjectList = sListResponse.data;
      if (this.subjectList.length == 0) {
        this.statusIndicator.setError("Heç bir fənn tapılmadı");
      }
    }
  }
}
