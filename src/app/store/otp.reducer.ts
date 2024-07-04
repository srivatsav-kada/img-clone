import { createReducer, on } from '@ngrx/store';
import { generateOtp, verifyOtp, otpVerified, otpFailed, resendOtp } from './otp.actions';
import { v4 as uuidv4 } from 'uuid';

export interface OtpState {
  generatedOtp: string;
  otpStatus: string;
}

export const initialState: OtpState = {
  generatedOtp: '',
  otpStatus: 'OTP sent successfully'
};

// const _otpReducer = createReducer(
//   initialState,
//   on(generateOtp, (state) => ({
//     ...state,
//     generatedOtp: Math.floor(100000 + Math.random() * 900000).toString(),
//     otpStatus: 'OTP sent successfully'
//   })),
//   on(verifyOtp, (state, { enteredOtp }) => ({
//     ...state,
//     otpStatus: state.generatedOtp === enteredOtp ? 'Yes' : 'Invalid OTP'
//   })),
//   on(otpVerified, (state) => ({
//     ...state,
//     otpStatus: 'Yes'
//   })),
//   on(otpFailed, (state) => ({
//     ...state,
//     otpStatus: 'Invalid OTP'
//   })),
//   on(resendOtp, (state) => ({
//     ...state,
//     generatedOtp: Math.floor(100000 + Math.random() * 900000).toString(),
//     otpStatus: 'OTP sent successfully'
//   }))
// );

// export function otpReducer(state: any, action: any) {
//   return _otpReducer(state, action);
// }

const generateSixDigitOtp = (): string => {
  const uuid = uuidv4();
  const otp = parseInt(uuid.replace(/\D/g, '').substring(0, 6));
  return otp.toString().padStart(6, '0');
};

const _otpReducer = createReducer(
  initialState,
  on(generateOtp, (state) => ({
    ...state,
    generatedOtp: generateSixDigitOtp(),
    otpStatus: 'OTP sent successfully'
  })),
  on(verifyOtp, (state, { enteredOtp }) => ({
    ...state,
    otpStatus: state.generatedOtp === enteredOtp ? 'Yes' : 'Invalid OTP'
  })),
  on(otpVerified, (state) => ({
    ...state,
    otpStatus: 'Yes'
  })),
  on(otpFailed, (state) => ({
    ...state,
    otpStatus: 'Invalid OTP'
  })),
  on(resendOtp, (state) => ({
    ...state,
    generatedOtp: generateSixDigitOtp(),
    otpStatus: 'OTP sent successfully'
  }))
);

export function otpReducer(state: any, action: any) {
  return _otpReducer(state, action);
}