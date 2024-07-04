import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersuccessComponent } from './transfersuccess.component';

describe('TransfersuccessComponent', () => {
  let component: TransfersuccessComponent;
  let fixture: ComponentFixture<TransfersuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransfersuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransfersuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
