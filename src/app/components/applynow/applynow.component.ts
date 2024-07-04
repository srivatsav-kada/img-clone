
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as ApplyNowActions from '../../store/applynow.actions';
import { AppState } from '../../models/app-state.model';
import { LogoutService } from '../../services/logout.service';
import { MatDialog } from '@angular/material/dialog';
import { selectUsername } from '../../store/auth.selectors';
import { Observable } from 'rxjs';
import { CustomValidators } from '../../store/validators';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-applynow',
  templateUrl: './applynow.component.html',
  styleUrls: ['./applynow.component.css']
})
export class ApplynowComponent implements OnInit {
  registrationForm!: FormGroup;
  unamestored: string = '';
  selectedCountryDialCode: string = '+91';
  countries = [
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'DE', name: 'Germany', dialCode: '+49' }
  ];
  states: { [key: string]: string[] } = {
    'IN': ['Delhi', 'Karnataka', 'Maharashtra'],
    'DE': ['Bavaria', 'Berlin', 'Hamburg']
  };
  maritalStatuses = ['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOW'];
  filteredStates: string[] = [];
  showDropdown = false;
  username$: Observable<string | null>;

  constructor(private fb: FormBuilder, private store: Store, private logoutService: LogoutService, private dialog: MatDialog,private authcheckdashboard : AuthService) {
    this.username$ = this.store.select(selectUsername as any);
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      title: ['', CustomValidators.required],
      firstName: ['', [CustomValidators.required, CustomValidators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)]],
      lastName: ['', CustomValidators.required],
      dob: ['', CustomValidators.required],
      maritalStatus: ['SINGLE', CustomValidators.required],
      addressLine1: ['', CustomValidators.required],
      addressLine2: [''],
      country: ['IN', CustomValidators.required],
      state: ['', CustomValidators.required],
      city: ['', CustomValidators.required],
      pinCode: ['',[ CustomValidators.required,CustomValidators.pinCodePattern('IN')]],
      mobileNumber: ['', [CustomValidators.required, CustomValidators.mobileNumberPattern('IN')]]
    });

    this.registrationForm.valueChanges.subscribe(value => {
      localStorage.setItem('registrationFormDatanew', JSON.stringify(this.registrationForm.value));
      // console.log(this.registrationForm)
      console.log('1')
    });

    this.registrationForm.get('country')!.valueChanges.subscribe((countryCode: string) => {
      this.registrationForm.get('state')!.setValue('');
      this.filteredStates = this.getStates(countryCode);
      // console.log('Country changed:', countryCode);
      // console.log('Filtered states:', this.filteredStates);
      console.log('2,3')

      // Update dial code display
      const country = this.countries.find(c => c.code === countryCode);
      this.selectedCountryDialCode = country ? country.dialCode : '';

      // Update mobile number validation
      const mobileNumberControl = this.registrationForm.get('mobileNumber');
      mobileNumberControl!.setValidators([CustomValidators.required, CustomValidators.mobileNumberPattern(countryCode)]);
      mobileNumberControl!.updateValueAndValidity();

      // Update pin code validation
      const pinCodeControl = this.registrationForm.get('pinCode');
    pinCodeControl!.setValidators([CustomValidators.required, CustomValidators.pinCodePattern(countryCode)]);
    pinCodeControl!.updateValueAndValidity();
     
    });

    this.username$.subscribe(username => {
      this.unamestored = username!;
      if (localStorage.getItem('usernamestored') === this.unamestored) {
        this.loadFormData2();
      } else {
        localStorage.removeItem('registrationFormDatanew');
      }
    });
    
    this.authcheckdashboard.changeTitle('Apply Now');
  
  }

  getStates(countryCode: string): string[] {
    return this.states[countryCode] || [];
  }

  onStateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.toLowerCase();
    const country = this.registrationForm.get('country')!.value;
    const allStates = this.getStates(country);
    this.filteredStates = allStates.filter(state => state.toLowerCase().includes(value));
    this.showDropdown = this.filteredStates.length > 0;
    // console.log('State input:', value);
    // console.log('Filtered states:', this.filteredStates);
    // console.log('Show dropdown:', this.showDropdown);
    console.log('4,5,6')
  }

  onStateFocus(): void {
    const country = this.registrationForm.get('country')!.value;
    this.filteredStates = this.getStates(country);
    this.showDropdown = this.filteredStates.length > 0;
    // console.log('State input focused');
    // console.log('Filtered states:', this.filteredStates);
    // console.log('Show dropdown:', this.showDropdown);
    console.log('7,8,9')
  }

  onStateBlur(): void {
    setTimeout(() => this.showDropdown = false, 200);
  }

  selectState(state: string): void {
    this.registrationForm.get('state')!.setValue(state);
    this.filteredStates = [];
    this.showDropdown = false;
  }

  loadFormData(): void {
    const savedFormData = localStorage.getItem('registrationFormData');
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      const formDataWithDefaults = {
        ...this.registrationForm.value,
        ...parsedFormData
      };
      this.registrationForm.setValue(formDataWithDefaults);
    }
  }

  loadFormData2(): void {
    const savedFormData = localStorage.getItem('registrationFormDatanew');
    if (savedFormData) {
      const parsedFormData = JSON.parse(savedFormData);
      const formDataWithDefaults = {
        ...this.registrationForm.value,
        ...parsedFormData
      };
      this.registrationForm.setValue(formDataWithDefaults);
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.store.dispatch(ApplyNowActions.saveFormData({ formData: this.registrationForm.value }));
      this.store.dispatch(ApplyNowActions.submitForm({ formData: this.registrationForm.value }));
    } else {
      this.openRegistrationFailedDialog('Please fill out all fields correctly.');
    }
  }

  openRegistrationFailedDialog(errorMessage: string): void {
    this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: { errorMessage }
    });
  }

  onLogout(): void {
    localStorage.setItem('registrationFormData', JSON.stringify(this.registrationForm.value));
  }

  onPrevious(): void {
    // Logic for previous button
  }
}
