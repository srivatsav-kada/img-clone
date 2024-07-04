import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { selectGeneratedOtp, selectOtpStatus } from '../../store/otp.selectors';
import { Store } from '@ngrx/store';
import { generateOtp, resendOtp, verifyOtp } from '../../store/otp.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otpForm: FormGroup;
  otpStatusSubscription: Subscription;
  generatedOtpSubscription: Subscription;
  otpStatus!: string;
  generatedOtp!: string;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<OtpComponent>
  ) {
    this.otpForm = this.fb.group({
      enteredOtp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    this.store.dispatch(generateOtp());

    this.otpStatusSubscription = this.store.select(selectOtpStatus).subscribe(status => {
      this.otpStatus = status;
    });

    this.generatedOtpSubscription = this.store.select(selectGeneratedOtp).subscribe(otp => {
      this.generatedOtp = otp;
    });
  }

  verifyOtp() {
    console.log('dad')
    const enteredOtp = this.otpForm.get('enteredOtp')?.value;
    this.store.dispatch(verifyOtp({ enteredOtp }));

    this.store.select(selectOtpStatus).subscribe(status => {
      if (status === 'Yes') {
        this.dialogRef.close('verified');
      } else {
        this.otpStatus = status; // Update status message
      }
    });
  }

  resendOtp() {
    this.store.dispatch(resendOtp());
  }

  isNumberKey(event: KeyboardEvent) {
    // const charCode = event.which ? event.which : event.keyCode;
    // if (charCode < 48 || charCode > 57) {
    //   event.preventDefault();
    // }
  }

  ngOnDestroy() {
    if (this.otpStatusSubscription) {
      this.otpStatusSubscription.unsubscribe();
    }
    if (this.generatedOtpSubscription) {
      this.generatedOtpSubscription.unsubscribe();
    }
  }
}