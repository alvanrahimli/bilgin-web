import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingFilterComponent } from './testing-filter.component';

describe('TestingFilterComponent', () => {
  let component: TestingFilterComponent;
  let fixture: ComponentFixture<TestingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
