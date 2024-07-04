
// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { ApplicantState } from './applicant-details.reducer';


// export const selectApplicantState = createFeatureSelector<ApplicantState>('applicants');

// export const selectAllApplicants = createSelector(
//   selectApplicantState,
//   (state: ApplicantState) => state.applicants
// );

// export const selectCurrentApplicant = createSelector(
//   selectApplicantState,
//   (state: ApplicantState) => state.selectedApplicant
// );

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicantState } from './applicant-details.reducer';

export const selectApplicantState = createFeatureSelector<ApplicantState>('applicants');

export const selectAllApplicants = createSelector(
  selectApplicantState,
  (state: ApplicantState) => state.applicants
);

export const selectCurrentApplicant = createSelector(
  selectApplicantState,
  (state: ApplicantState) => state.selectedApplicant
);
