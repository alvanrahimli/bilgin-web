import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusResponse } from 'src/app/models/homepage/status.response';

@Component({
  selector: 'app-homepage-status',
  templateUrl: './homepage-status.component.html',
  styleUrls: ['./homepage-status.component.css']
})
export class HomepageStatusComponent implements OnInit {

  constructor(public router: Router) { }

  @Input()
  status: StatusResponse = {} as StatusResponse;

  ngOnInit(): void {
  }

}
