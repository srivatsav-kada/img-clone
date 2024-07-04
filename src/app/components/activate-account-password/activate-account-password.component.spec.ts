import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAccountPasswordComponent } from './activate-account-password.component';

describe('ActivateAccountPasswordComponent', () => {
  let component: ActivateAccountPasswordComponent;
  let fixture: ComponentFixture<ActivateAccountPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivateAccountPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivateAccountPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
