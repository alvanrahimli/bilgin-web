import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassesService } from 'src/app/services/class/classes.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-add-class-modal',
  templateUrl: './add-class-modal.component.html',
  styleUrls: ['./add-class-modal.component.css']
})
export class AddClassModalComponent implements OnInit {

  constructor(private classesService: ClassesService,
    private modalService: NgbModal) { }

  status: StatusIndicator = new StatusIndicator();

  className: string = "";
  gradeId: number = -1;

  @Output()
  onSuccess = new EventEmitter<any>();

  ngOnInit(): void {
  }

  async addClass() {
    this.status.setProgress();
    if ((this.className ?? "").length < 2) {
      this.status.setError("Sinif adı çox qısadır");
      return;
    }

    if (this.gradeId == -1) {
      this.status.setError("Sinif nömrəsi seçin");
      return;
    }

    let addClassResponse = await this.classesService.addClass({
      name: this.className!,
      gradeId: this.gradeId
    });

    if (addClassResponse.hasError) {
      this.status.setError("Sinif əlavə edə bilmədik 😢");
      return;
    }

    this.status.setCompleted("Sinif əlavə olundu 🥳", true);
    this.onSuccess.emit();
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
