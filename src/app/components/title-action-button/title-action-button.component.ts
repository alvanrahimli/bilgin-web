import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';

@Component({
  selector: 'app-title-action-button',
  templateUrl: './title-action-button.component.html',
  styleUrls: ['./title-action-button.component.css']
})
export class TitleActionButtonComponent implements OnInit {

  ActionButtonRole = ActionButtonRole;

  constructor() { }

  @Input()
  button: ActionButton = {} as ActionButton;

  @Output()
  onClick = new EventEmitter<any>();

  ngOnInit(): void {
  }

  clicked() {
    this.onClick.emit();
  }

  getClassNames(): string {
    switch(this.button.role) {
        case ActionButtonRole.Add:
          return "fa-plus";
        case ActionButtonRole.Delete:
          return "fa-trash";
        case ActionButtonRole.Filter:
          return "fa-filter";
        default:
          return "";  
    }
}
}
