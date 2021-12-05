import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPackResultComponent } from './test-pack-result.component';

describe('TestPackResultComponent', () => {
  let component: TestPackResultComponent;
  let fixture: ComponentFixture<TestPackResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPackResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPackResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
