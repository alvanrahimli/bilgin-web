import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleActionButtonComponent } from './title-action-button.component';

describe('TitleActionButtonComponent', () => {
  let component: TitleActionButtonComponent;
  let fixture: ComponentFixture<TitleActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleActionButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
