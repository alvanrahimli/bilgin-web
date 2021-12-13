import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-test-open-ended',
  templateUrl: './test-open-ended.component.html',
  styleUrls: ['./test-open-ended.component.css']
})
export class TestOpenEndedComponent implements OnInit {

  constructor() { }

  @Output()
  onClick = new EventEmitter<string>();
  @Output()
  onModified = new EventEmitter<any>();
  @Output()
  onSubmitted = new EventEmitter<any>();
  @Output()
  onClear = new EventEmitter<any>();

  @Input()
  answerText: string = "";

  ngOnInit(): void {
  }

  areaFocused(): void {
    this.onModified.emit();
  }

  areaLostFocus(): void {
    if (this.answerText.length == 0) {
      this.onClear.emit();
    } else {
      this.onSubmitted.emit(this.answerText);
    }
  }

}
