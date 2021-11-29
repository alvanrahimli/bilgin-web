import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TestAnswerComponent } from 'src/app/components/test-answer/test-answer.component';
import { NavigationDirection } from 'src/app/models/enums/navigation-direction';
import { MatchingAnswerRequest, TestAnswerRequest } from 'src/app/models/test-package/request/test-package';
import { TestPackageResponse } from "src/app/models/test-package/response/TestPackageResponse";
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';

@Component({
  selector: 'app-single-test-package',
  templateUrl: './single-test-package.component.html',
  styleUrls: ['./single-test-package.component.css']
})
export class SingleTestPackageComponent implements OnInit {

  NavigationDirection = NavigationDirection;

  constructor(private activatedRoute: ActivatedRoute,
    private testPackageService: TestPackagesService) { }
  
  package: TestPackageResponse = {} as TestPackageResponse;
  totalTestCount: number = 0;

  currentTestIndex: number = 0;
  selectedChoiceId: string = "";

  answers: TestAnswerRequest[] = [];
  modifiedTests: boolean[] = [];

  async ngOnInit(): Promise<void> {
    var params = await firstValueFrom(this.activatedRoute.params);
    await this.loadPackage(params["pId"]);
  }

  async loadPackage(pId: string): Promise<void> {
    let packageResponse = await this.testPackageService.getPackage(pId);
    if (packageResponse.hasError) {
      console.log(packageResponse.error);
    } else {
      this.package = packageResponse.data;
      this.totalTestCount = packageResponse.data.tests.length;
      this.modifiedTests = packageResponse.data.tests.map(() => false);
    }
  }

  //#region EVENT EMITTER HANDLERS

  choiceClicked(choiceId: string): void {
    this.selectedChoiceId = choiceId;
  }

  answerModified(data: any): void {
    this.modifiedTests[this.currentTestIndex] = true;
  }

  answerSubmitted(answerData: any): void {
    // Upsert new answer to answers list
    let newAnswer = {
      testId: this.package.tests[this.currentTestIndex].id,
      testType: this.package.tests[this.currentTestIndex].testType
    } as TestAnswerRequest;

    if (this.package.tests[this.currentTestIndex].testType == "MultipleChoice") {
      newAnswer.choiceId = answerData as string;
    } else if (this.package.tests[this.currentTestIndex].testType == "Open") {
      newAnswer.text = answerData as string;
    } else if (this.package.tests[this.currentTestIndex].testType == "Matching") {
      newAnswer.matchings = answerData as MatchingAnswerRequest[];
    }

    let alreadyAnswered = this.answers.find(a => a.testId == this.package.tests[this.currentTestIndex].id);
    if (alreadyAnswered) {
      this.answers.forEach(e => {
        if (e.testId == this.package.tests[this.currentTestIndex].id) {
          e.choiceId = newAnswer.choiceId;
          e.matchings = newAnswer.matchings;
          e.text = newAnswer.text;
        }
      })
    } else {
      this.answers.push(newAnswer);
    }
  }

  answerCleared(eventData: any): void {
    let currentTest = this.package.tests[this.currentTestIndex];
    let answerIndex = this.answers.findIndex(a => a.testId == currentTest.id);
    if (answerIndex >= 0) {
      this.answers.splice(answerIndex, 1);
      this.selectedChoiceId = "";
    }
    this.modifiedTests[this.currentTestIndex] = false;
  }

  //#endregion

  navigateTests(dir: NavigationDirection): void {
    if (dir == NavigationDirection.Forward) {
      if (this.currentTestIndex < this.package.tests.length - 1) {
        this.currentTestIndex++;
      }
    } else if (dir == NavigationDirection.Backward) {
      if (this.currentTestIndex > 0) {
        this.currentTestIndex--;
      }
    }

    // Load current test selected answer
    let currentTest = this.package.tests[this.currentTestIndex];
    let currentAnswer = this.answers.find(a => a.testId == currentTest.id);
    if (currentAnswer) {
      if (currentTest.testType == "MultipleChoice") {
        this.selectedChoiceId = currentAnswer.choiceId;
      } else if (currentTest.testType == "Open") {
        // TODO: Add loading open test's answer
      } else if (currentTest.testType == "Matching") {
        // TODO: Add loading matching test's answer
      }
    }
  }

  isCurrentTheLast(): boolean {
    return this.currentTestIndex != this.package.tests.length - 1;
  }
}
