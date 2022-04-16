import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { ClassDetailsResponse } from 'src/app/models/class/class-details.response';
import { StudentResponse } from 'src/app/models/class/student.response';
import { ClassesService } from 'src/app/services/class/classes.service';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';
import { StatusIndicator } from 'src/app/utils/status-indicator';
import { localizeDateTime } from 'src/app/utils/time-helper';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  PageTab = PageTab;

  constructor(private classesService: ClassesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) {
      this.actionButtons.push({
        id: "btn-add-student",
        btnText: "Yeni şagird",
        role: ActionButtonRole.Add,
        event: this.openStudentModal,
        visible: true
      });
      this.actionButtons.push({
        id: "btn-assign",
        btnText: "Tapşırıq ver",
        role: ActionButtonRole.Add,
        event: this.startAssignment,
        visible: true
      });
    }

  @ViewChild("studentModal")
  addStudentModal: TemplateRef<any> | undefined;

  status: StatusIndicator = new StatusIndicator();
  modalStatus: StatusIndicator = new StatusIndicator();
  actionButtons: ActionButton[] = [];
  currentTab: PageTab = PageTab.Students;

  classDetails: ClassDetailsResponse = {} as ClassDetailsResponse;
  students: StudentResponse[] = [];

  async ngOnInit(): Promise<void> {
    this.status.setProgress();

    var params = await firstValueFrom(this.activatedRoute.params);
    let detailsResponse = await this.classesService.getClass(params["id"]);
    if (detailsResponse.hasError) {
      this.status.setError();
      return;
    }

    this.classDetails = detailsResponse.data;
    this.students = detailsResponse.data.students;
    this.status.setCompleted();
  }

  async removeStudent(infoId: string): Promise<void> {
    this.status.setProgress();
    let removeResponse = await this.classesService.removeStudentFromClass({
      classId: this.classDetails.id,
      studentInfoId: infoId,
    });

    if (removeResponse.hasError) {
      this.status.setError("Şagirdi sinifdən xaric edə bilmədik. Yenidən cəhd edin.");
      return;
    }

    await this.ngOnInit();
    this.status.setCompleted("Şagird sinifdən xaric olundu", true);
  }

  async removeTeacher(infoId: string): Promise<void> {

  }

  async studentSelected(infoId: any): Promise<void> {
    this.status.setProgress();
    let additionResponse = await this.classesService.addStudentToClass({
      classId: this.classDetails.id,
      studentInfoId: infoId,
      phoneNumber: infoId,
    });

    if (additionResponse.hasError) {
      if (additionResponse.error instanceof HttpErrorResponse) {
        if (additionResponse.error.status == 409) {
          this.status.setError("Şagird artıq sinfə əlavə olunub");
          return;
        }
      }

      this.status.setError("Şagird əlavə oluna bilmədi. Yenidən yoxlayın");
      return;
    }

    await this.ngOnInit();
    this.status.setCompleted("Şagird əlavə olundu", true);
  }

  openStudentModal = (): void => {
    this.status.setCompleted();
    this.modalService.open(this.addStudentModal, {ariaLabelledBy: 'modal-student-form', centered: true}).result.then(res => {
      this.status.setCompleted();
    }, (reason) => {
      this.status.setCompleted();
    });
  }

  getSchoolName(): string {
    if (this.classDetails?.school?.name.length <= 16) {
      return `  (${this.classDetails?.school?.name})`;
    } else {
      return `  (${this.classDetails?.school?.name.substring(0, 16)}...)`
    }
  }

  startAssignment = (): void => {
    this.router.navigate(["/subjects"], {
      queryParams: {
        mode: 'assignment',
        class: this.classDetails.id
      }
    });
  }

  localizeType(type: string): string {
    if (type == "TestPackage") {
      return "Test tapşırığı";
    }
    else {
      return "N/A";
    }
  }

  goToAssignment(type: string, relatedId: string | null): void {
    if (type == "TestPackage") {
      // TODO: Router does not redirect user
      console.log("Navigating to:", type, relatedId);
      this.router.navigate(['.']);
    }
  }

  getActiveClass(tab: PageTab): string {
    return this.currentTab == tab ? 'active' : '';
  }

  setCurrentTab(tab: PageTab): void {
    this.currentTab = tab;
  }

  getRemainingTime(date: Date): string {
    if (!date) {
      return "Vaxt limiti yoxdur";
    }

    if (moment().isAfter(date)) {
      return "Vaxt bitib";
    }

    let duration = moment.duration(moment(date).diff(moment.now()));
    let hours = Math.floor(duration.asHours());
    let minutes = Math.floor(duration.asMinutes() % 60);
    let seconds = Math.floor(duration.asSeconds() % 60);

    let remainingStr = "";
    if (hours > 0) {
      remainingStr += `${hours} saat `;
    }
    if (minutes > 0) {
      remainingStr += `${minutes} dəq, `;
    }
    if (seconds > 0) {
      remainingStr += `${seconds} san.`;
    }
    
    return `${remainingStr} qalıb`;
  }

  // humanizeDateTime(date: Date): string {
  //   return this.datePipe.transform(localizeDateTime(date), "dd MMM yyyy, hh:mm") ?? 'N/A';
  // }

  localizeDateTime = localizeDateTime;
}

enum PageTab {
  Students, Teachers, Assignments
}
