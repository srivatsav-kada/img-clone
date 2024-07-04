import { createReducer, on } from '@ngrx/store';
import * as ApplyNowActions from './applynow.actions';

export interface ApplyNowState {
  formData: any;
  error: any;
}

export const initialState: ApplyNowState = {
  formData: null,
  error: null,
};

export const applyNowReducer = createReducer(
  initialState,
  on(ApplyNowActions.saveFormData, (state, { formData }) => ({
    ...state,
    formData
  })),
  on(ApplyNowActions.submitFormFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ApplyNowActions.submitFormSuccess, state => ({
    ...state,
    formData: null,
    error: null
  }))
);
