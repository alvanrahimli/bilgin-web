import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestChoiceResponse } from 'src/app/models/test-package/response/TestChoiceResponse';

@Component({
  selector: 'app-test-choices',
  templateUrl: './test-choices.component.html',
  styleUrls: ['./test-choices.component.css']
})
export class TestChoicesComponent implements OnInit {

  constructor() { }

  @Input()
  choice: TestChoiceResponse = {} as TestChoiceResponse;
  @Input()
  selectedId: string = "";
  @Input()
  clicked: boolean = false;

  @Output()
  onClick: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  onModified: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onClear: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  onAnswerClick(): void {
    if (this.clicked) {
      this.onClear.emit(this.choice.id);
    } else {
      this.onClick.emit(this.choice.id);
      this.onModified.emit(this.choice.id);
      this.onSubmitted.emit(this.choice.id);
    }
  }

  amISelected(): boolean {
    return this.choice.id == this.selectedId;
  }
}
