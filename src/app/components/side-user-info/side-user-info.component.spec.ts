import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideUserInfoComponent } from './side-user-info.component';

describe('SideUserInfoComponent', () => {
  let component: SideUserInfoComponent;
  let fixture: ComponentFixture<SideUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
