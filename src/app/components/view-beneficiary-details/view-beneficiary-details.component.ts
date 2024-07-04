import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { selectCurrentBeneficiary } from '../../store/beneficiary.selectors';
import { Beneficiary } from '../view-beneficiary/beneficiary.model';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-view-beneficiary-details',
  templateUrl: './view-beneficiary-details.component.html',
  styleUrl: './view-beneficiary-details.component.css'
})
export class ViewBeneficiaryDetailsComponent {

  selectedBeneficiary$!: Observable<Beneficiary | null>;
  beneficiaryForm!: FormGroup;

  constructor(private store: Store<any>, private fb: FormBuilder,private authcheckdashboard: AuthService) {}

  ngOnInit(): void {
    this.beneficiaryForm = this.fb.group({
      Name: [{ value: '', disabled: true }],
      age: [{ value: '', disabled: true }],
      IBAN: [{ value: '', disabled: true }],
      beneficiaryType: [{ value: '', disabled: true }]
    });

    this.selectedBeneficiary$ = this.store.select(selectCurrentBeneficiary);

    this.selectedBeneficiary$.subscribe((beneficiary: Beneficiary | null) => {
      if (beneficiary) {
        this.beneficiaryForm.patchValue({
          Name: beneficiary.Name,
          age: beneficiary.age,
          IBAN: beneficiary.IBAN,
          beneficiaryType: beneficiary.beneficiaryType,
        });
      }
    });

    this.authcheckdashboard.changeTitle('Beneficiary Details');
  }
}