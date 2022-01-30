import { Component, OnInit } from '@angular/core';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  status: StatusIndicator = new StatusIndicator();

  ngOnInit(): void {
    this.status.setError("Modul hazır deyil");
  }

}
