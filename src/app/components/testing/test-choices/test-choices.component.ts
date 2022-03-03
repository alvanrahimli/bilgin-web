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
  choices: TestChoiceResponse[] = [];

  @Input()
  choice: TestChoiceResponse = {} as TestChoiceResponse;
  @Input()
  selectedId: string = "";

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

  onAnswerClick(id: string): void {
    console.log("selected:", this.selectedId, "now", id);
    if (this.selectedId == id) {
      this.onClear.emit(id);
    } else {
      this.onClick.emit(id);
      this.onModified.emit(id);
      this.onSubmitted.emit(id);
    }
  }

  amISelected(id: string): boolean {
    return id == this.selectedId;
  }

  isImageChoices(): boolean {
    return this.choices.some(e => e.imageUrl != null);
  }
}
