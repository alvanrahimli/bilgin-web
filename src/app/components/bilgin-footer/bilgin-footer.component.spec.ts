import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilginFooterComponent } from './bilgin-footer.component';

describe('BilginFooterComponent', () => {
  let component: BilginFooterComponent;
  let fixture: ComponentFixture<BilginFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilginFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
