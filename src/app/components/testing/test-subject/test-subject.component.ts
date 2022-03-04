import { Component, Input, OnInit } from '@angular/core';
import { SubjectResponse } from 'src/app/models/test-subject/response/subjectResponse';
import { TestingPageMode } from 'src/app/utils/testing-mode';

@Component({
  selector: 'app-test-subject',
  templateUrl: './test-subject.component.html',
  styleUrls: ['./test-subject.component.css']
})
export class TestSubjectComponent implements OnInit {

  constructor() { }

  @Input() subject: SubjectResponse = {} as SubjectResponse;
  @Input() mode: TestingPageMode = "testing";
  @Input() assignmentClassId: string | undefined;

  ngOnInit(): void {
  }

}
