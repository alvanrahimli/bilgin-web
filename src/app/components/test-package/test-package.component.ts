import { Component, Input, OnInit } from '@angular/core';
import { TestPackageBriefResponse } from 'src/app/models/test-package/response/test-package-brief';

@Component({
  selector: 'app-test-package',
  templateUrl: './test-package.component.html',
  styleUrls: ['./test-package.component.css']
})
export class TestPackageComponent implements OnInit {

  @Input() package: TestPackageBriefResponse = {} as TestPackageBriefResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
