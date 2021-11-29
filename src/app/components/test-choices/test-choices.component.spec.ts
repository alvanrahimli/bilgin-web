import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChoicesComponent } from './test-choices.component';

describe('TestChoicesComponent', () => {
  let component: TestChoicesComponent;
  let fixture: ComponentFixture<TestChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestChoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
