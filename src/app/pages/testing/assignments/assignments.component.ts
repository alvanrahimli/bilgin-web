import { Component, OnInit, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { AssignmentResponse } from 'src/app/models/assignment/assignment.response';
import { AssignmentsService } from 'src/app/services/assignments/assignments.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';
import { localizeDateTime } from 'src/app/utils/time-helper';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  constructor(private assignmentsService: AssignmentsService) { }

  status = new StatusIndicator();
  assignments: AssignmentResponse[] = [];

  async ngOnInit(): Promise<void> {
    this.status.setProgress();
    let assignmentsResponse = await this.assignmentsService.getAll();
    if (assignmentsResponse.hasError) {
      this.status.setError("Tapşırıqları əldə edə bilmədik 🙄");
      return;
    }

    this.assignments = assignmentsResponse.data.sort(a => a.completed ? 1 : 0);
    this.assignments.forEach(a => {
      a.dueDate = a.dueDate != null ? localizeDateTime(a.dueDate) : null;
    });
    if (this.assignments.length == 0) {
      this.status.setError("Heç bir tapşırığınız yoxdur! 🥳");
    } else {
      this.status.setCompleted();
    }
  }

}
