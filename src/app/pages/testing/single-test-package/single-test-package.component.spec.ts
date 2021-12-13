import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTestPackageComponent } from './single-test-package.component';

describe('SingleTestPackageComponent', () => {
  let component: SingleTestPackageComponent;
  let fixture: ComponentFixture<SingleTestPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTestPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTestPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
