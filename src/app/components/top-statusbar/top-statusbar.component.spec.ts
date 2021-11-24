import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStatusbarComponent } from './top-statusbar.component';

describe('TopStatusbarComponent', () => {
  let component: TopStatusbarComponent;
  let fixture: ComponentFixture<TopStatusbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStatusbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopStatusbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
