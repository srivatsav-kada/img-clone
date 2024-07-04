import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmoneyConfirmationComponent } from './sendmoney-confirmation.component';

describe('SendmoneyConfirmationComponent', () => {
  let component: SendmoneyConfirmationComponent;
  let fixture: ComponentFixture<SendmoneyConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendmoneyConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendmoneyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
