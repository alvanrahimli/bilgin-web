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
  remains: string = "Hesablanır...";

  now = moment();

  ngOnInit(): void {
    setInterval(() => {
      this.remains = this.getRemainingTime();
    }, 1000);
  }

  getRemainingTime(): string {
    if (!this.assignment.dueDate) {
      return "Vaxt limiti yoxdur";
    }

    if (moment().isAfter(this.assignment.dueDate)) {
      return "Vaxt bitib";
    }

    let duration = moment.duration(moment(this.assignment.dueDate).diff(moment.now()));
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

}
