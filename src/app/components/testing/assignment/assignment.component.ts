import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AssignmentResponse } from 'src/app/models/assignment/assignment.response';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  constructor() { }

  @Input()
  assignment: AssignmentResponse = {} as AssignmentResponse;

  now = moment();

  ngOnInit(): void {
  }

  getHumanizedDueDate(): string {
    if (this.now.isAfter(this.assignment.dueDate)) {
      return "Vaxtı keçib";
    }

    // return this.assignment.dueDate?.toLocaleTimeString("az");
    return new Date(this.assignment.dueDate).toLocaleTimeString("az");
  }

}
