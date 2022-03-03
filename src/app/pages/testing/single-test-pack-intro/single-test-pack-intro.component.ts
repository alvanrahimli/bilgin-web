import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, firstValueFrom } from 'rxjs';
import { TestPackageResponse } from 'src/app/models/test-package/response/TestPackageResponse';
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-single-test-pack-intro',
  templateUrl: './single-test-pack-intro.component.html',
  styleUrls: ['./single-test-pack-intro.component.css']
})
export class SingleTestPackIntroComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    private testPackageService: TestPackagesService) { }
  
  statusIndicator: StatusIndicator = new StatusIndicator();

  package: TestPackageResponse = {} as TestPackageResponse;

  async ngOnInit(): Promise<void> {
    var params = await firstValueFrom(this.activatedRoute.params);
    await this.loadPackage(params["pId"]);
  }

  async loadPackage(pId: string): Promise<void> {
    this.statusIndicator.setProgress("Test yüklənir...");
    let packageResponse = await this.testPackageService.getPackage(pId);
    if (packageResponse.hasError) {
      console.log(packageResponse.error);
      if (packageResponse.error instanceof HttpErrorResponse) {
        switch (packageResponse.error.status) {
          case 409:
            this.router.navigate(["..", "completion"], {relativeTo: this.activatedRoute});
            break;
        }
      }
      this.statusIndicator.setError();
    } else {
      this.package = packageResponse.data;
      console.log(this.package);
      if (this.package.isAssignment) {
        this.statusIndicator.setCompleted("Bu test sizin ev tapşırığınızdır", true);
        console.log("EV TAPSIRIGI");
      }
      else {
        this.statusIndicator.setCompleted();
      }
    }
  }

  getTitle(): string {
    let title = this.package?.paragraphName == '' 
      ? this.package?.subjectName 
      : this.package?.paragraphName + ', ' + this.package?.subjectName;
    
    console.log(title);
    return title;
  }
}
