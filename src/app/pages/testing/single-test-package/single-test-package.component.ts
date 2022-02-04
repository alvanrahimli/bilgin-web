import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NavigationDirection } from 'src/app/models/enums/navigation-direction';
import { MatchingAnswerRequest, TestAnswerRequest } from 'src/app/models/test-package/request/test-package';
import { TestPackageResponse } from "src/app/models/test-package/response/TestPackageResponse";
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';
import { StatusIndicator } from 'src/app/utils/status-indicator';

@Component({
  selector: 'app-single-test-package',
  templateUrl: './single-test-package.component.html',
  styleUrls: ['./single-test-package.component.css']
})
export class SingleTestPackageComponent implements OnInit {

  NavigationDirection = NavigationDirection;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private testPackageService: TestPackagesService) { }
  
  statusIndicator: StatusIndicator = new StatusIndicator();

  package: TestPackageResponse = {} as TestPackageResponse;
  totalTestCount: number = 0;

  currentTestIndex: number = 0;
  selectedChoiceId: string = "";
  writtenAnswerText: string = "";

  answers: TestAnswerRequest[] = [];
  modifiedTests: boolean[] = [];

  async ngOnInit(): Promise<void> {
    var params = await firstValueFrom(this.activatedRoute.params);
    await this.loadPackage(params["pId"]);
  }

  async loadPackage(pId: string): Promise<void> {
    this.statusIndicator.setProgress("Test yüklənir...");
    let packageResponse = await this.testPackageService.getPackage(pId);
    if (packageResponse.hasError) {
      console.log(packageResponse.error);
      if (packageResponse.error instanceof HttpErrorResponse) {
        switch (packageResponse.error.status) {
          case 409:
            this.router.navigate(["completion"], {relativeTo: this.activatedRoute});
            break;
        }
      }
      this.statusIndicator.setError();
    } else {
      this.package = packageResponse.data;
      this.totalTestCount = packageResponse.data.tests.length;
      if (this.totalTestCount == 0) {
        this.statusIndicator.setError("Heç bir test tapılmadı");
      }
      
      this.modifiedTests = packageResponse.data.tests.map(() => false);
      this.statusIndicator.setCompleted();
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

    this.selectedChoiceId = answerData as string;
  }

  answerCleared(eventData: any): void {
    let currentTest = this.package.tests[this.currentTestIndex];
    let answerIndex = this.answers.findIndex(a => a.testId == currentTest.id);
    if (answerIndex >= 0) {
      this.answers.splice(answerIndex, 1);
      this.selectedChoiceId = "";
      this.writtenAnswerText = "";
    }
    this.modifiedTests[this.currentTestIndex] = false;
  }

  async finishTestClick(): Promise<void> {
    this.statusIndicator.setProgress();
    let response = await this.testPackageService.submitAnswers(this.package.id, this.answers);
    if (response.hasError) {
      console.error(response.error);
      if (response.error instanceof HttpErrorResponse) {
        switch (response.error.status) {
          case 409:
            console.log("Bu testi artıq işləmisiniz");
            this.statusIndicator.setError("Bu testi artıq işləmisiniz");
            break;
          case 404:
            console.log("Test tapılmadı");
            this.statusIndicator.setError("Test tapılmadı");
            break;
          default:
            this.statusIndicator.setError();
            console.log(response.error.statusText);
            break;
        }
      } else {
        this.statusIndicator.setError();
        console.log("ERROR:", response.error);
      }
      return;
    } else {
      this.statusIndicator.setCompleted();
    }

    if (response.data.showResultImmediately) {
      let params = await firstValueFrom(this.activatedRoute.params);
      this.router.navigate(["/subjects", params["sId"], "packages", params["pId"], "completion"]);
    } else {
      this.statusIndicator.setCompleted("Cavablarınız qeydə alındı. Nəticələr məlum olduqda sizə bildiriş göndəriləcək", true);
    }
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
        this.writtenAnswerText = currentAnswer.text;
      } else if (currentTest.testType == "Matching") {
        // TODO: Add loading matching test's answer
      }
    }
  }

  onPreviousClick() {
    this.navigateTests(NavigationDirection.Backward);
  }

  onNextClick() {
    this.navigateTests(NavigationDirection.Forward);
  }

  isCurrentTheLast(): boolean {
    return this.currentTestIndex == this.package?.tests?.length - 1;
  }
}
