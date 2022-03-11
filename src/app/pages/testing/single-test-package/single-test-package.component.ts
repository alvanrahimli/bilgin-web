import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { NavigationDirection } from 'src/app/models/enums/navigation-direction';
import { MatchingAnswerRequest, TestAnswerRequest } from 'src/app/models/test-package/request/test-package';
import { TestPackageResponse } from "src/app/models/test-package/response/TestPackageResponse";
import { ClassesService } from 'src/app/services/class/classes.service';
import { TestPackagesService } from 'src/app/services/tests/test-packages/test-packages.service';
import { ActionButton, ActionButtonRole } from 'src/app/utils/action-button';
import { StatusIndicator } from 'src/app/utils/status-indicator';
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
    }
  }

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

  giveAssignment = async (): Promise<void> => {
    this.assignmentStatus.setProgress();
    let assignmentResponse = await this.classesService.assignPackage({
      testPackageId: this.package.id,
      classId: this.assignmentClassId ?? ""
    });
    if (assignmentResponse.hasError) {
      this.assignmentStatus.setError();
      return;
    }

    this.assignmentStatus.setCompleted("Test sinifə tapşırıldı. Testlər səhifəsinə yönləndiriləcəksiniz", true);
    setTimeout(() => {
      this.router.navigate(["../../../"], {relativeTo: this.activatedRoute, queryParamsHandling: 'merge'});
    }, 3000);
  }

  async onTimeIsUp() {
    this.modalService.open(this.timeupModal, {ariaLabelledBy: 'modal-timeup', centered: true}).result.then(res => {
      
    }, (reason) => {

    });
    await this.finishTestClick();
    clearInterval(this.remainingTimeIntervalId);
    console.log("Finish test");
  }

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
