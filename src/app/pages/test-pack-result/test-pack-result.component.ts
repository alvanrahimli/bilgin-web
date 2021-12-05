import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TestCompletionBriefResponse } from 'src/app/models/test-package/response/test-completion-response';
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';

@Component({
  selector: 'app-test-pack-result',
  templateUrl: './test-pack-result.component.html',
  styleUrls: ['./test-pack-result.component.css']
})
export class TestPackResultComponent implements OnInit {

  constructor(private testPackService: TestPackagesService,
    private activatedRoute: ActivatedRoute) { }

  completion: TestCompletionBriefResponse = {} as TestCompletionBriefResponse;

  async ngOnInit(): Promise<void> {
    let queryParams = await firstValueFrom(this.activatedRoute.params);
    let completionResult = await this.testPackService.getCompletion(queryParams["pId"]);
    if (completionResult.hasError) {
      if (completionResult.error instanceof HttpErrorResponse) {
        switch (completionResult.error.status) {
          case 404:
            console.log("Siz bu testi tamamlamamısınız");
            break;
          default:
            break;
        }
      }

      console.error(completionResult.error);
    }

    this.completion = completionResult.data;
  }

}
