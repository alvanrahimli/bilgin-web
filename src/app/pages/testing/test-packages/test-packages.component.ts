import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendarPersian, NgbCollapse, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { TestingFilter } from 'src/app/models/shared/testing-filter.dto';
import { TestPacksFilterContext } from 'src/app/models/test-package/request/filter-context';
import { TestPackageBriefResponse } from 'src/app/models/test-package/response/test-package-brief';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';
import { TestSubjectsService } from 'src/app/services/tests/test-subjects/test-subjects.service';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';
import { StatusIndicator } from 'src/app/utils/status-indicator';
import { TestingPageMode } from 'src/app/utils/testing-mode';

@Component({
  selector: 'app-test-packages',
  templateUrl: './test-packages.component.html',
  styleUrls: ['./test-packages.component.css'],
})
export class TestPackagesComponent implements OnInit {

  constructor(private packService: TestPackagesService,
    private subjectsService: TestSubjectsService,
    private activatedRoute: ActivatedRoute) {
      this.actionButtons.push(new ActionButton(ActionButtonRole.Filter, this.toggleFilter));
    }

  statusIndicator = new StatusIndicator();
  actionButtons: ActionButton[] = [];
  isFilterOpen: boolean = true;
  pageMode: TestingPageMode = "testing";
  assignmentClassId: string | undefined;

  loaded = false;

  packages: TestPackageBriefResponse[] = [];
  subject: SubjectResponse = {} as SubjectResponse;

  async ngOnInit(): Promise<void> {
    this.statusIndicator.setProgress();
    let params = await firstValueFrom(this.activatedRoute.params)
    let subjectId = params["sId"];
    let queryParams = await firstValueFrom(this.activatedRoute.queryParams);
    if (queryParams["mode"] == "assignment") {
      this.pageMode = "assignment";
      this.assignmentClassId = queryParams["class"];
    }

    await this.loadSubjectInfo(subjectId);
    await this.loadPackageList(subjectId);

    if (this.pageMode == "assignment") {
      this.statusIndicator.setCompleted("Siz sinif üçün test tapşırığı seçirsiniz", true);
    }
  }

  async loadPackageList(subId: string, gradeId: number | null = null, paragraphId: string | null = null): Promise<void> {
    let listResponse = await this.packService.getPackageList({
      subjectId: subId,
      gradeId: gradeId,
      paragraphId: paragraphId
    } as TestPacksFilterContext);

    if (listResponse.hasError) {
      console.log(listResponse.error);
      this.statusIndicator.setError();
    } else {
      this.packages = listResponse.data;
      if (listResponse.data.length == 0) {
        this.statusIndicator.setError("Heç bir toplu tapılmadı");
      } else {
        this.statusIndicator.setCompleted();
      }
    }
  }

  async loadSubjectInfo(subId: string): Promise<void> {
    let subject = await this.subjectsService.getSubjectById(subId);

    if (subject.hasError) {
      console.log(subject.error);
    } else {
      this.subject = subject.data;
    }
  }

  async submitFilter(filter: TestingFilter): Promise<void> {
    await this.loadPackageList(this.subject.id, filter.gradeId, filter.paragraphId);
  }

  toggleFilter = (): void => {
    this.isFilterOpen = !this.isFilterOpen;
  }
}