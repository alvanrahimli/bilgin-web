import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestPacksFilterContext } from 'src/app/models/test-package/request/filter-context';
import { TestPackageBriefResponse } from 'src/app/models/test-package/response/test-package-brief';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';
import { TestSubjectsService } from 'src/app/services/tests/test-subjects/test-subjects.service';

@Component({
  selector: 'app-test-packages',
  templateUrl: './test-packages.component.html',
  styleUrls: ['./test-packages.component.css']
})
export class TestPackagesComponent implements OnInit {

  packages: TestPackageBriefResponse[] = [];
  subject: SubjectResponse = {} as SubjectResponse;

  constructor(private packService: TestPackagesService,
    private subjectsService: TestSubjectsService,
    private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe(
      async (params) => {
        let subjectId = params["sId"];
        await this.loadPackageList(subjectId);
        await this.loadSubjectInfo(subjectId);
      }
    )
  }

  async loadPackageList(subId: string): Promise<void> {
    let listResponse = await this.packService.getPackageList({
      subjectId: subId
    } as TestPacksFilterContext);

    if (listResponse.hasError) {
      console.log(listResponse.error);
    } else {
      this.packages = listResponse.data;
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
}
