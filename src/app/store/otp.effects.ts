import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { generateOtp, verifyOtp, otpVerified, otpFailed, resendOtp } from './otp.actions';
import { OtpState } from './otp.reducer';
import { selectGeneratedOtp } from './otp.selectors';

@Injectable()
export class OtpEffects {
  constructor(private actions$: Actions, private store: Store<OtpState>) {}

  generateOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generateOtp),
      map(() => ({ type: '[OTP] Generate OTP Success' }))
    )
  );

  verifyOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyOtp),
      withLatestFrom(this.store.select(selectGeneratedOtp)),
      map(([action, generatedOtp]) =>
        action.enteredOtp === generatedOtp ? otpVerified() : otpFailed()
      )
    )
  );

  resendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resendOtp),
      map(() => generateOtp())
    )
  );
}
