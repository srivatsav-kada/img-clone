import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OtpState } from './otp.reducer';

export const selectOtpState = createFeatureSelector<OtpState>('otp');

export const selectGeneratedOtp = createSelector(
  selectOtpState,
  (state: OtpState) => state.generatedOtp
);

export const selectOtpStatus = createSelector(
  selectOtpState,
  (state: OtpState) => state.otpStatus
);
