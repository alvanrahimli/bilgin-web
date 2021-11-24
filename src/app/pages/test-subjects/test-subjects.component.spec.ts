import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSubjectsComponent } from './test-subjects.component';

describe('TestSubjectsComponent', () => {
  let component: TestSubjectsComponent;
  let fixture: ComponentFixture<TestSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
