import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTestPackIntroComponent } from './single-test-pack-intro.component';

describe('SingleTestPackIntroComponent', () => {
  let component: SingleTestPackIntroComponent;
  let fixture: ComponentFixture<SingleTestPackIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTestPackIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTestPackIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
