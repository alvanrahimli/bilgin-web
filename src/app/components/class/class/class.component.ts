import { Component, Input, OnInit } from '@angular/core';
import { TeacherClassResponse } from 'src/app/models/class/teacher-class.response';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor() { }

  @Input()
  teacherClass: TeacherClassResponse | null = null;

  ngOnInit(): void {
  }

}
