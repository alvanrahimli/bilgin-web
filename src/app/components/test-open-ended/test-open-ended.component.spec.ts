import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOpenEndedComponent } from './test-open-ended.component';

describe('TestOpenEndedComponent', () => {
  let component: TestOpenEndedComponent;
  let fixture: ComponentFixture<TestOpenEndedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOpenEndedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOpenEndedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
