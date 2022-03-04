import { Component, Input, OnInit } from '@angular/core';
import { TestPackageBriefResponse } from 'src/app/models/test-package/response/test-package-brief';
import { TestingPageMode } from 'src/app/utils/testing-mode';

@Component({
  selector: 'app-test-package',
  templateUrl: './test-package.component.html',
  styleUrls: ['./test-package.component.css']
})
export class TestPackageComponent implements OnInit {

  @Input() 
  package: TestPackageBriefResponse = {} as TestPackageBriefResponse;
  @Input()
  headerColorHex: string | null = null;
  @Input()
  mode: TestingPageMode = "testing";
  @Input()
  assignmentClassId: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
