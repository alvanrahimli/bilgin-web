import { Component, Input, OnInit } from '@angular/core';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';

@Component({
  selector: 'app-test-subject',
  templateUrl: './test-subject.component.html',
  styleUrls: ['./test-subject.component.css']
})
export class TestSubjectComponent implements OnInit {

  constructor() { }

  @Input() subject: SubjectResponse = {} as SubjectResponse;

  ngOnInit(): void {
  }

}
