import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherClassResponse } from 'src/app/models/class/teacher-class.response';
import { ClassesService } from 'src/app/services/class/classes.service';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  constructor(private classesService: ClassesService,
    private modalService: NgbModal) {
      this.actionButtons.push({
        btnText: "Yeni sinif",
        role: ActionButtonRole.Add,
        visible: true,
        event: this.openAddClassModal
      });
    }

  @ViewChild("addClassModal")
  addClassModalRef: TemplateRef<any> | undefined;

  status: StatusIndicator = new StatusIndicator();
  classes: TeacherClassResponse[] = [];
  actionButtons: ActionButton[] = []

  async ngOnInit(): Promise<void> {
    this.status.setProgress();

    let classesResponse = await this.classesService.getClassesForUser();
    if (classesResponse.hasError) {
      this.status.setError("Məlumatlar əldə oluna bilmədi");
      return;
    }

    this.classes = classesResponse.data;
    this.status.setCompleted();
  }

  async onSuccessfulAdd(): Promise<void> {
    await this.ngOnInit();
  }

  openAddClassModal = () => {
    this.modalService.open(this.addClassModalRef, {ariaLabelledBy: 'modal-student-form', centered: false}).result.then(res => {
      this.status.setCompleted();
    }, (reason) => {
      this.status.setCompleted();
    });
  }
}
