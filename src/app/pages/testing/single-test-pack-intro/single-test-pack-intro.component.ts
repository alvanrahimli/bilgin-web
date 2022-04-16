import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { delay, firstValueFrom } from 'rxjs';
import { TestPackageResponse } from 'src/app/models/test-package/response/TestPackageResponse';
import { ClassesService } from 'src/app/services/class/classes.service';
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';
import { StatusIndicator } from 'src/app/utils/status-indicator';
import { TestingPageMode } from 'src/app/utils/testing-mode';

@Component({
  selector: 'app-single-test-pack-intro',
  templateUrl: './single-test-pack-intro.component.html',
  styleUrls: ['./single-test-pack-intro.component.css']
})
export class SingleTestPackIntroComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    private testPackageService: TestPackagesService,
    private classesService: ClassesService,
    private modalService: NgbModal) { }
  
  statusIndicator: StatusIndicator = new StatusIndicator();
  actionButtons: ActionButton[] = [];
  pageMode: TestingPageMode = "testing";
  assignmentClassId: string | undefined;
  @ViewChild("assignedModal")
  assignedModal: TemplateRef<any> | undefined;

  package: TestPackageResponse = {} as TestPackageResponse;

  async ngOnInit(): Promise<void> {
    var params = await firstValueFrom(this.activatedRoute.params);
    await this.loadPackage(params["pId"]);
    
    let queryParams = await firstValueFrom(this.activatedRoute.queryParams);
    if (queryParams["mode"] == "assignment") {
      this.pageMode = "assignment";
      this.assignmentClassId = queryParams["class"];
    }

    if (this.pageMode == "assignment") {
      this.statusIndicator.setCompleted("Siz sinif üçün test tapşırığı seçirsiniz", true);
      this.actionButtons.push({
        id: "btn-assign",
        btnText: "Tapşır",
        role: ActionButtonRole.Add,
        visible: true,
        event: this.giveAssignment
      });
    }
  }

  async loadPackage(pId: string): Promise<void> {
    this.statusIndicator.setProgress("Test yüklənir...");
    let packageResponse = await this.testPackageService.getPackage(pId);
    if (packageResponse.hasError) {
      if (packageResponse.error instanceof HttpErrorResponse) {
        switch (packageResponse.error.status) {
          case 409:
            this.router.navigate(["..", "completion"], {relativeTo: this.activatedRoute});
            break;
          case 452:
            this.statusIndicator.setError("Test üçün cavabların qəbulu vaxtı başa çatıb 😥");
            return;
        }
      }
      this.statusIndicator.setError();
    } else {
      this.package = packageResponse.data;
      if (this.package.isAssignment) {
        this.statusIndicator.setCompleted("Bu test sizin ev tapşırığınızdır", true);
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
    
    return title;
  }

  giveAssignment = async (): Promise<void> => {
    this.statusIndicator.setProgress();
    let assignmentResponse = await this.classesService.assignPackage({
      testPackageId: this.package.id,
      classId: this.assignmentClassId ?? "",
      dueDate: null,
    });
    if (assignmentResponse.hasError) {
      this.statusIndicator.setError();
      return;
    }

    this.statusIndicator.setCompleted("Test sinifə tapşırıldı 🥳. Testlər səhifəsinə yönləndiriləcəksiniz", true);
    
    this.modalService.open(this.assignedModal, {ariaLabelledBy: 'modal-assigned', centered: true})
      .result.then(res => { }, (reason) => { });
    setTimeout(() => {
        this.modalService.dismissAll();
    }, 2500);

    setTimeout(() => {
      this.router.navigate(["../../../"], {relativeTo: this.activatedRoute, queryParamsHandling: 'merge'});
    }, 3000);
  }
}
