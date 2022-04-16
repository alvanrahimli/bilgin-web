import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { NavigationDirection } from 'src/app/models/enums/navigation-direction';
import { MatchingAnswerRequest, TestAnswerRequest } from 'src/app/models/test-package/request/test-package';
import { TestPackageResponse } from "src/app/models/test-package/response/TestPackageResponse";
import { TestResponse } from 'src/app/models/test-package/response/TestResponse';
import { ClassesService } from 'src/app/services/class/classes.service';
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';
import { StatusIndicator } from 'src/app/utils/status-indicator';
import { TestStatus } from 'src/app/utils/test-status';
import { TestingPageMode } from 'src/app/utils/testing-mode';
import { localizeDateTime } from 'src/app/utils/time-helper';

@Component({
  selector: 'app-single-test-package',
  templateUrl: './single-test-package.component.html',
  styleUrls: ['./single-test-package.component.css']
})
export class SingleTestPackageComponent implements OnInit {

  NavigationDirection = NavigationDirection;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private testPackageService: TestPackagesService,
    private classesService: ClassesService) {}
  
  statusIndicator: StatusIndicator = new StatusIndicator();
  assignmentStatus: StatusIndicator = new StatusIndicator();
  pageMode: TestingPageMode = "testing";
  assignmentClassId: string | undefined;
  actionButtons: ActionButton[] = [];
  remainingTime: string = "";
  remainingTimeIntervalId: number | undefined;
  @ViewChild("timeupModal")
  timeupModal: TemplateRef<any> | undefined;
  @ViewChild("assignedModal")
  assignedModal: TemplateRef<any> | undefined;

  package: TestPackageResponse = {} as TestPackageResponse;
  totalTestCount: number = 0;

  currentTestId: string = "";
  currentTestIndex: number = 0;
  selectedChoiceId: string = "";
  writtenAnswerText: string = "";

  answers: TestAnswerRequest[] = [];
  modifiedTests: boolean[] = [];
  testStatuses: TestStatus[] = [];

  async ngOnInit(): Promise<void> {
    var params = await firstValueFrom(this.activatedRoute.params);
    await this.loadPackage(params["pId"]);

    let queryParams = await firstValueFrom(this.activatedRoute.queryParams);
    if (queryParams["mode"] == "assignment") {
      this.pageMode = "assignment";
      this.assignmentClassId = queryParams["class"];
    }

    if (this.pageMode == "assignment") {
      this.assignmentStatus.setCompleted("Sualları nəzərdən keçirin, \"Tapşır\" seçib təstiqləyin", true);
      this.actionButtons.push({
        id: "btn-assign",
        btnText: "Tapşır",
        role: ActionButtonRole.Add,
        visible: true,
        event: this.giveAssignment
      });
    } else if (this.pageMode == "testing" && this.package?.assignment?.dueDate) {
      this.actionButtons.push({
        id: "btn-remaining-time",
        btnText: `Qalan vaxt: ${this.getRemainingTime()}`,
        event: this.onTimeIsUp,
        visible: true,
        role: ActionButtonRole.None
      });

      // Update remaining time action button text every second
      this.remainingTimeIntervalId = setInterval(() => {
        let timeBtn = this.actionButtons.find(b => b.id == "btn-remaining-time");
        if (timeBtn) {
          timeBtn.btnText = `Qalan vaxt: ${this.getRemainingTime()}`;
        }

        if (moment().isAfter(this.package.assignment.dueDate)) {
          this.onTimeIsUp();
        }
      }, 1000);
    } else if (this.pageMode == "testing") {
      this.currentTestId = this.package.tests[0].id;
    }
  }

  // Gets package data from API
  // Localizes assignment due date if exists
  // Initializes testStatuses (marks first as isCurrent)
  async loadPackage(pId: string): Promise<void> {
    this.statusIndicator.setProgress("Test yüklənir...");
    let packageResponse = await this.testPackageService.getPackage(pId);
    if (packageResponse.hasError) {
      if (packageResponse.error instanceof HttpErrorResponse) {
        switch (packageResponse.error.status) {
          case 409:
            this.router.navigate(["completion"], {relativeTo: this.activatedRoute});
            break;
          case 452:
            this.statusIndicator.setError("Test üçün cavabların qəbulu vaxtı başa çatıb 😥");
            return;
        }
      }
      this.statusIndicator.setError();
    } else {
      this.package = packageResponse.data;
      this.totalTestCount = packageResponse.data.tests.length;
      if (this.totalTestCount == 0) {
        this.statusIndicator.setError("Heç bir test tapılmadı");
      }
      
      if (this.package.assignment?.dueDate) {
        this.package.assignment.dueDate = localizeDateTime(this.package.assignment.dueDate);
      }
      this.modifiedTests = packageResponse.data.tests.map(() => false);
      this.testStatuses = packageResponse.data.tests.map(t => {
        return {
          testId: t.id,
          isCurrent: false,
          modified: false
        }
      });

      this.currentTestId = packageResponse.data.tests[0].id;
      this.testStatuses[0].isCurrent = true;
      this.statusIndicator.setCompleted();
    }
  }

  //#region EVENT EMITTER HANDLERS

  // Updates this.selectedChoiceId to incoming choiceId
  choiceClicked(choiceId: string): void {
    this.selectedChoiceId = choiceId;
  }

  // Finds modified answer from answers list
  // Updates it to modified = TRUE
  answerModified(data: any): void {
    let modifiedTest = this.testStatuses.find(t => t.testId == this.currentTestId);
    if (modifiedTest) {
      modifiedTest.modified = true;
    }
  }

  // Finds answered test
  // Upserts new answer to answers list
  // Updates this.selectedChoiceId to currently answered test
  answerSubmitted(answerData: any): void {
    console.log("Answered", answerData);
    let answeredTest = this.package.tests.find(t => t.id == this.currentTestId);
    if (!answeredTest) {
      console.log("Answered test not found");
      return;
    }

    let newAnswer = {
      testId: answeredTest?.id,
    } as TestAnswerRequest;

    if (answeredTest.testType == "MultipleChoice") {
      newAnswer.choiceId = answerData as string;
    } else if (answeredTest.testType == "Open") {
      newAnswer.text = answerData as string;
    } else if (answeredTest.testType == "Matching") {
      newAnswer.matchings = answerData as MatchingAnswerRequest[];
    }

    let alreadyAnswered = this.answers.find(a => a.testId == this.currentTestId);
    if (alreadyAnswered) {
      alreadyAnswered.choiceId = newAnswer.choiceId;
      alreadyAnswered.matchings = newAnswer.matchings;
      alreadyAnswered.text = newAnswer.text;
    } else {
      this.answers.push(newAnswer);
    }

    this.selectedChoiceId = answerData as string;
  }

  // Finds answered test
  // Finds answer from answers list and deletes that item
  // Updates testStatuses list (sets modified to false)
  answerCleared(eventData: any): void {
    let currentTest = this.package.tests.find(t => t.id == this.currentTestId);
    if (!currentTest) {
      console.log("Current test not found");
      return;
    }

    let answerIndex = this.answers.findIndex(a => a.testId == currentTest?.id);
    if (answerIndex >= 0) {
      this.answers.splice(answerIndex, 1);
      this.selectedChoiceId = "";
      this.writtenAnswerText = "";
    }

    let answeredTestStatus = this.testStatuses.find(t => t.testId == currentTest?.id);
    if (answeredTestStatus) {
      answeredTestStatus.modified = false;
    }
  }

  // Submits answers to API
  // If package has showResultImmediately set to TRUE, redirect to result page
  // If package has showResultImmediately set to FALSE, show friendly message
  async finishTestClick(): Promise<void> {
    this.statusIndicator.setProgress();
    let response = await this.testPackageService.submitAnswers(this.package.id, this.answers);
    if (response.hasError) {
      console.error(response.error);
      if (response.error instanceof HttpErrorResponse) {
        switch (response.error.status) {
          case 409:
            this.statusIndicator.setError("Bu testi artıq işləmisiniz");
            break;
          case 404:
            this.statusIndicator.setError("Test tapılmadı");
            break;
          case 452:
            this.statusIndicator.setError("Test üçün cavabların qəbulu vaxtı başa çatıb 😥. Cavablarınız nəzərə alınmadı");
            break;
          default:
            this.statusIndicator.setError();
            console.log(response.error.statusText);
            break;
        }
      } else {
        this.statusIndicator.setError();
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

  // Returns current test based on this.currentTestId
  getCurrentTest(): TestResponse {
    let test = this.package.tests.find(t => t.id == this.currentTestId);
    if (test) {
      return test;
    } else {
      console.error("Current test id not found");
      return {} as TestResponse;
    }
  }

  getCurrentTestUserFriendlyIndex(testId: string): number {
    return this.package.tests.findIndex(t => t.id == testId) + 1;
  }

  // Decides on navigating direction
  // Loads navigated test to current test
  // Loads selectedChoiceId, text or matchings
  navigateTests(dir: NavigationDirection): void {
    let currentTestIndex = this.package.tests.findIndex(t => t.id == this.currentTestId);
    if (currentTestIndex < 0) {
      return;
    }

    // Get test that will be navigated:
    let futureTest: TestResponse = {} as TestResponse;
    if (dir == NavigationDirection.Forward) {
      if (currentTestIndex < this.package.tests.length - 1) {
        futureTest = this.package.tests[currentTestIndex + 1];
      }
    } else if (dir == NavigationDirection.Backward) {
      if (currentTestIndex > 0) {
        futureTest = this.package.tests[currentTestIndex - 1];
      }
    }

    this.navigateByTestId(futureTest.id);
  }

  navigateByTestId(testId: string): void {
    let futureTest = this.package.tests.find(t => t.id == testId);
    if (!futureTest) {
      return;
    }

    this.currentTestId = futureTest.id;
    this.testStatuses.forEach(ts => {
      if (ts.testId == this.currentTestId) {
        ts.isCurrent = true;
      } else {
        ts.isCurrent = false;
      }
    });
    
    let futureTestsAnswer = this.answers.find(a => a.testId == futureTest?.id);
    console.log(futureTestsAnswer);
    if (futureTestsAnswer) {
      if (futureTest.testType == "MultipleChoice") {
        this.selectedChoiceId = futureTestsAnswer.choiceId;
      } else if (futureTest.testType == "Open") {
        this.writtenAnswerText = futureTestsAnswer.text;
      } else if (futureTest.testType == "Matching") {
        // TODO: Add loading matching test's answer
      }
    }
  }

  // Shorthand for navigateTest()
  onPreviousClick() {
    this.navigateTests(NavigationDirection.Backward);
  }

  // Shorthand for navigateTest()
  onNextClick() {
    this.navigateTests(NavigationDirection.Forward);
  }

  // Finds current test
  // Returns TRUE if it is the last
  isCurrentTheLast(): boolean {
    let currentTestIndex = this.package.tests.findIndex(t => t.id == this.currentTestId);
    return currentTestIndex == this.package?.tests?.length - 1;
  }

  giveAssignment = async (): Promise<void> => {
    this.assignmentStatus.setProgress();
    let assignmentResponse = await this.classesService.assignPackage({
      testPackageId: this.package.id,
      classId: this.assignmentClassId ?? "",
      dueDate: null,
    });
    if (assignmentResponse.hasError) {
      this.assignmentStatus.setError();
      return;
    }

    this.assignmentStatus.setCompleted("Test sinifə tapşırıldı. Testlər səhifəsinə yönləndiriləcəksiniz", true);
    
    this.modalService.open(this.assignedModal, {ariaLabelledBy: 'modal-assigned', centered: true})
      .result.then(res => { }, (reason) => { });
    setTimeout(() => {
        this.modalService.dismissAll();
    }, 2500);

    setTimeout(() => {
      this.router.navigate(["../../../"], {relativeTo: this.activatedRoute, queryParamsHandling: 'merge'});
    }, 3000);
  }

  // Opens time-up modal
  // Submits test on behalf of student
  // Clears remainingTime interval
  async onTimeIsUp() {
    this.modalService.open(this.timeupModal, {ariaLabelledBy: 'modal-timeup', centered: true})
      .result.then(res => { }, (reason) => { });

    await this.finishTestClick();
    clearInterval(this.remainingTimeIntervalId);
  }

  // Returns user-friendly text for remaining time to show at actionButton
  getRemainingTime = (): string => {
    if (!this.package.assignment.dueDate) {
      return "Vaxt limiti yoxdur";
    }

    if (moment().isAfter(this.package.assignment.dueDate)) {
      return "Vaxt bitib";
    }

    let duration = moment.duration(moment(this.package.assignment.dueDate).diff(moment.now()));
    let hours = Math.floor(duration.asHours());
    let minutes = Math.floor(duration.asMinutes() % 60);
    let seconds = Math.floor(duration.asSeconds() % 60);

    let remainingStr = "";
    if (hours > 0) {
      remainingStr += `${hours} saat `;
    }
    if (minutes > 0) {
      remainingStr += `${minutes} dəq, `;
    }
    if (seconds > 0) {
      remainingStr += `${seconds} san.`;
    }
    
    return remainingStr;
  }

  ngOnDestroy() {
    clearInterval(this.remainingTimeIntervalId);
  }
}
