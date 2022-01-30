import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-card',
  templateUrl: './homepage-card.component.html',
  styleUrls: ['./homepage-card.component.css']
})
export class HomepageCardComponent implements OnInit {

  constructor() { }

  @Input()
  bgImageLink: string = "";

  ngOnInit(): void {
  }

}
