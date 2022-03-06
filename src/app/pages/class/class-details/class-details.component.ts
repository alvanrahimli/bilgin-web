import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { ClassDetailsResponse } from 'src/app/models/class/class-details.response';
import { StudentResponse } from 'src/app/models/class/student.response';
import { ClassesService } from 'src/app/services/class/classes.service';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  constructor(private classesService: ClassesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) {
      this.actionButtons.push({
        btnText: "Yeni şagird",
        role: ActionButtonRole.Add,
        event: this.openStudentModal,
        visible: true
      });
      this.actionButtons.push({
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
    console.log(this.students);
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
}
