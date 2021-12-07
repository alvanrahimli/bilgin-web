import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TestCompletionBriefResponse } from 'src/app/models/test-package/response/test-completion-response';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';
import { TestSubjectsService } from 'src/app/services/tests/test-subjects/test-subjects.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-test-pack-result',
  templateUrl: './test-pack-result.component.html',
  styleUrls: ['./test-pack-result.component.css']
})
export class TestPackResultComponent implements OnInit {

  constructor(private testPackService: TestPackagesService,
    private activatedRoute: ActivatedRoute,
    private subjectsService: TestSubjectsService) { }

  subjectList: SubjectResponse[] = [];
  completion: TestCompletionBriefResponse = {} as TestCompletionBriefResponse;
  statusIndicator = new StatusIndicator();

  async ngOnInit(): Promise<void> {
    this.statusIndicator.setProgress();
    let queryParams = await firstValueFrom(this.activatedRoute.params);
    
    let completionResult = await this.testPackService.getCompletion(queryParams["pId"]);
    if (completionResult.hasError) {
      if (completionResult.error instanceof HttpErrorResponse) {
        switch (completionResult.error.status) {
          case 404:
            this.statusIndicator.setError("Siz bu testi tamamlamamısınız");
            break;
          case 425:
            this.statusIndicator.setCompleted("Cavablarınız qeydə alınıb. Nəticələr məlum olduqda sizə bildiriş göndəriləcək", true);
            break;
          default:
            break;
        }
      }

      console.error(completionResult.error);
    } else {
      this.statusIndicator.setCompleted();
      await this.loadSubjectList();
    }

    this.completion = completionResult.data;
  }

  async loadSubjectList(): Promise<void> {
    this.statusIndicator.setProgress();
    let sListResponse = await this.subjectsService.getSubjectList();

    if (sListResponse.hasError) {
      console.log("ERROR while load subject list:", sListResponse.error);
      this.statusIndicator.setError();
    } else {
      this.statusIndicator.setCompleted();
      this.subjectList = sListResponse.data.slice(0, 3);
    }
  }

}
