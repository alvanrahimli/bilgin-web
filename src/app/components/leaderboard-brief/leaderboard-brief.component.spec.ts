import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardBriefComponent } from './leaderboard-brief.component';

describe('LeaderboardBriefComponent', () => {
  let component: LeaderboardBriefComponent;
  let fixture: ComponentFixture<LeaderboardBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardBriefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
