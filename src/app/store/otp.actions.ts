import { createAction, props } from '@ngrx/store';

export const generateOtp = createAction('[OTP] Generate OTP');
export const verifyOtp = createAction('[OTP] Verify OTP', props<{ enteredOtp: string }>());
export const otpVerified = createAction('[OTP] OTP Verified');
export const otpFailed = createAction('[OTP] OTP Failed');
export const resendOtp = createAction('[OTP] Resend OTP');
