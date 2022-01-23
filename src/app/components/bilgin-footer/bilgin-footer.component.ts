import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bilgin-footer',
  templateUrl: './bilgin-footer.component.html',
  styleUrls: ['./bilgin-footer.component.css']
})
export class BilginFooterComponent implements OnInit {

  constructor() { }

  @Input()
  footerText: string = "Bilgini sına, öyrənməkdən yorulma!";

  ngOnInit(): void {
  }

}
