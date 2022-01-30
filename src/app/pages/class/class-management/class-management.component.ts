import { Component, OnInit } from '@angular/core';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-class-management',
  templateUrl: './class-management.component.html',
  styleUrls: ['./class-management.component.css']
})
export class ClassManagementComponent implements OnInit {

  constructor() { }

  status: StatusIndicator = new StatusIndicator();

  ngOnInit(): void {
    this.status.setError("Modul hazır deyil");
  }

}
