import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { TestSubjectsService } from 'src/app/services/tests/test-subjects/test-subjects.service';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';
import { StatusIndicator } from 'src/app/utils/status-indicator';
import { TestingPageMode } from 'src/app/utils/testing-mode';

@Component({
  selector: 'app-test-subjects',
  templateUrl: './test-subjects.component.html',
  styleUrls: ['./test-subjects.component.css']
})
export class TestSubjectsComponent implements OnInit {
  constructor(private subjectsService: TestSubjectsService,
    private route: ActivatedRoute) {
    // this.actionButtons.push(new ActionButton(ActionButtonRole.Filter, this.openFilter));
  }
  
  statusIndicator = new StatusIndicator();
  pageMode: TestingPageMode = "testing";
  assignmentClassId: string | undefined;
  actionButtons: ActionButton[] = [];

  subjectList: SubjectResponse[] = [];

  async ngOnInit(): Promise<void> {
    await this.loadSubjectList();

    let params = await firstValueFrom(this.route.queryParams);
    if (params["mode"] == "assignment") {
      this.pageMode = "assignment";
      this.assignmentClassId = params["class"];
    }

    if (this.pageMode == "assignment") {
      this.statusIndicator.setCompleted("Siz sinif üçün test tapşırığı seçirsiniz", true);
    }
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

  openFilter = (): void => {
    
  }
}
