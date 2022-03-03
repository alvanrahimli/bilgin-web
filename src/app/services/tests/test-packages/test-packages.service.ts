import { Injectable } from '@angular/core';
import { TestPacksFilterContext } from 'src/app/models/test-package/request/filter-context';
import { TestAnswerRequest } from 'src/app/models/test-package/request/test-package';
import { TestCompletionBriefResponse } from 'src/app/models/test-package/response/test-completion-response';
import { TestPackageBriefResponse } from 'src/app/models/test-package/response/test-package-brief';
import { TestPackageResponse } from "src/app/models/test-package/response/TestPackageResponse";
import { GeneralService } from '../../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class TestPackagesService extends GeneralService {
  getPackageList(filter: TestPacksFilterContext, url: string = "tests/TestPackages/?") {
    if (filter.subjectId) url += `SubjectId=${filter.subjectId}`;
    if (filter.gradeId && filter.gradeId != null) url += `&GradeId=${filter.gradeId}`;
    if (filter.paragraphId && filter.paragraphId != null) url += `&ParagraphId=${filter.paragraphId}`;
    return this.sendGetRequest<TestPackageBriefResponse[]>(url);
  }

  getPackage(id: string, url: string = "tests/TestPackages/") {
    return this.sendGetRequest<TestPackageResponse>(url + id);
  }

  submitAnswers(packageId: string, answers: TestAnswerRequest[], url: string = "tests/TestPackages/:id/submit") {
    let formattedUrl = url.replace(":id", packageId);
    return this.sendPostRequest<TestAnswerRequest[], TestCompletionBriefResponse>(answers, formattedUrl);
  }

  getCompletion(packageId: string, url: string = "tests/TestPackages/:id/completion") {
    let formattedUrl = url.replace(":id", packageId);
    return this.sendGetRequest<TestCompletionBriefResponse>(formattedUrl);
  }
}
