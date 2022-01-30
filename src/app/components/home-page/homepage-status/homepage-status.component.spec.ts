import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageStatusComponent } from './homepage-status.component';

describe('HomepageStatusComponent', () => {
  let component: HomepageStatusComponent;
  let fixture: ComponentFixture<HomepageStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
