import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApplicantDetailsNewService } from '../../services/applicant-details-new.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrl: './tax-form.component.css'
})
export class TaxFormComponent implements OnInit {
  taxForm: FormGroup;
  countries: string[] = ['Country1', 'Country2', 'Country3']; // Add your country list
  reasons: string[] = ['I will apply', 'I am not taxpayer'];
  destroy$: Subject<void> = new Subject<void>();

  @Output() formDataSubmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder,private router:Router,private applicantService : ApplicantDetailsNewService,private authcheckdashboard: AuthService) {
    this.taxForm = this.fb.group({
      taxResidentGermany: ['no'],
      germanyTIN: ['no'],
      taxResidentUS: ['yes'],
      usTIN: ['no'],
      usTINNumber :[''],
      appliedUsTIN:[''],
      AppliedusTIN: [''],
     taxResidentOther: [''],
      otherCountry: [''],
      otherTIN: [''],
      otherTINReason: [''],
      otherJurisdictionTIN: [''],
      otherJurisdictionTINReason: ['']
    });
  }

  ngOnInit(): void {
     this.setupFormControls();
  }

  // ngAfterViewInit() {
  //   this.authcheckdashboard.changeTitle('Tax Forms');
  // }

  setupFormControls(): void {
    this.taxForm.get('taxResidentGermany')?.valueChanges.subscribe(value => {
      this.taxForm.get('germanyTIN')?.setValue('');
    });

    this.taxForm.get('taxResidentUS')?.valueChanges.subscribe(value => {
      this.taxForm.get('usTIN')?.setValue('');
      this.taxForm.get('AppliedusTIN')?.setValue('');
      this.taxForm.get('taxResidentOther')?.setValue('');
      this.taxForm.get('otherCountry')?.setValue('');
      this.taxForm.get('otherTIN')?.setValue('');
      this.taxForm.get('otherTINReason')?.setValue('');
    });

    this.taxForm.get('taxResidentOther')?.valueChanges.subscribe(value => {
      if (value === 'no' && this.taxForm.get('taxResidentUS')?.value === 'no') {
        alert('Select at least one yes');
      }
      this.taxForm.get('otherCountry')?.setValue('');
      this.taxForm.get('otherTIN')?.setValue('');
      this.taxForm.get('otherTINReason')?.setValue('');
    });

    this.taxForm.get('otherTIN')?.valueChanges.subscribe(value => {
      this.taxForm.get('otherTINReason')?.setValue('');
    });

    this.taxForm.get('otherJurisdictionTIN')?.valueChanges.subscribe(value => {
      this.taxForm.get('otherJurisdictionTINReason')?.setValue('');
    });

    this.taxForm.valueChanges.subscribe(value => {
      this.applicantService.setTaxFormData(value);
    });

    this.authcheckdashboard.changeTitle('TIN DETAILS');
   
  }

  goFurther(){
    this.router.navigate(['/home/activateAccountPswd'])
  }
}