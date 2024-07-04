
import { createAction, props } from '@ngrx/store';
import { Applicant } from './applicant-details.model';

export const loadApplicants = createAction('[Applicant] Load Applicants');
export const loadApplicantsSuccess = createAction(
  '[Applicant] Load Applicants Success',
  props<{ applicants: Applicant[] }>()
);
export const selectApplicant = createAction(
  '[Applicant] Select Applicant',
  props<{ username: string }>()
);