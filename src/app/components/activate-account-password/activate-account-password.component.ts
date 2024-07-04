import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {faCheck, faCoffee, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApplicantDetailsNewService } from '../../services/applicant-details-new.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate-account-password',
  templateUrl: './activate-account-password.component.html',
  styleUrl: './activate-account-password.component.css'
})
export class ActivateAccountPasswordComponent implements OnInit {
passwordForm: FormGroup;
faCheck = faCheck;
faTimes = faTimes;

constructor(private fb: FormBuilder,private applicantService : ApplicantDetailsNewService,private authcheckdashboard: AuthService) {
  this.passwordForm = this.fb.group({
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      this.patternValidator(/\d/, { hasNumber: true }),
      this.patternValidator(/[A-Z]/, { hasUpperCase: true }),
      this.patternValidator(/[a-z]/, { hasLowerCase: true }),
      this.patternValidator(/[$@#&!]/, { hasSpecialCharacter: true })
    ]],
    confirmPassword: ['', Validators.required]
  }, { validator: this.passwordMatchValidator });
}
  ngOnInit(): void {
    this.passwordForm.valueChanges.subscribe(value => {
      this.applicantService.setPasswordFormData(value);
    });
    this.authcheckdashboard.changeTitle('Activate Account Password');
    
  }

patternValidator(regex: RegExp, error: { [key: string]: boolean }): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    return valid ? null : error;
  };
}

passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { mismatch: true };
  }
  return null;
}

onSubmit() {
  if (this.passwordForm.valid) {
    console.log('Form Submitted!', this.passwordForm.value);
  }
}
}