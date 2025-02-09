import { Component, Input, OnInit } from '@angular/core';
import { Status, StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-status-indicator',
  templateUrl: './status-indicator.component.html',
  styleUrls: ['./status-indicator.component.css']
})
export class StatusIndicatorComponent implements OnInit {
  Status = Status;

  constructor() { }
  @Input()
  status: StatusIndicator = {status: Status.pending} as StatusIndicator;

  ngOnInit(): void {
  }

  errorTextNotExists(): boolean {
    return this.status.errorText == "" || this.status.errorText == undefined;
  }

  loadingTextNotExists(): boolean {
    return this.status.inProgressText == "" || this.status.inProgressText == undefined;
  }

  completedTextNotExists(): boolean {
    return this.status.completedText == "" || this.status.completedText == undefined;
  }
}
