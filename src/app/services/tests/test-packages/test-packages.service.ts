import { Injectable } from '@angular/core';
import { TestPacksFilterContext } from 'src/app/models/test-package/request/filter-context';
import { TestPackageBriefResponse } from 'src/app/models/test-package/response/test-package-brief';
import { TestPackageResponse } from "src/app/models/test-package/response/TestPackageResponse";
import { GeneralService } from '../../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class TestPackagesService extends GeneralService {
  getPackageList(filter: TestPacksFilterContext, url: string = "TestPackages/?") {
    if (filter.subjectId) url += `SubjectId=${filter.subjectId}`;
    // TODO: Implement other filters
    return this.sendGetRequest<TestPackageBriefResponse[]>(url);
  }

  getPackage(id: string, url: string = "TestPackages/") {
    return this.sendGetRequest<TestPackageResponse>(url + id);
  }
}
