import { Component, Input, OnInit } from '@angular/core';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  constructor() { }

  @Input()
  showBackButton: boolean = true;
  @Input()
  level: number = 1;
  @Input()
  confirm: boolean = false;
  @Input()
  titleText: string = "";
  @Input()
  actionButtons: ActionButton[] = [];

  ngOnInit(): void {
  }

  filterActionClicked() {
    console.log("Filter clicked");
  }

  addActionClicked() {
    console.log("ADD CLICKED");
  }

}
