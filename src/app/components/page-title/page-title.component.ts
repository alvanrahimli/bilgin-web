import { Component, Input, OnInit } from '@angular/core';

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

  ngOnInit(): void {
  }

}
