import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBeneficiaryDetailsComponent } from './view-beneficiary-details.component';

describe('ViewBeneficiaryDetailsComponent', () => {
  let component: ViewBeneficiaryDetailsComponent;
  let fixture: ComponentFixture<ViewBeneficiaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBeneficiaryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBeneficiaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
