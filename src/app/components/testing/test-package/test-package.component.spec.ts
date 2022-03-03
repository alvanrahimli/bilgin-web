import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPackageComponent } from './test-package.component';

describe('TestPackageComponent', () => {
  let component: TestPackageComponent;
  let fixture: ComponentFixture<TestPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
