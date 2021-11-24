import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBriefComponent } from './stats-brief.component';

describe('StatsBriefComponent', () => {
  let component: StatsBriefComponent;
  let fixture: ComponentFixture<StatsBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsBriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
