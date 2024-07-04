
// import { createReducer, on } from '@ngrx/store';
// // import { loadApplicantsSuccess, selectApplicant } from '../actions/applicant.actions';
// import { loadApplicantsSuccess,selectApplicant } from './applicant-details.actions';
// import { Applicant } from './applicant-details.model';


// export interface ApplicantState {
//   applicants: Applicant[];
//   selectedApplicant: Applicant | null;
// }

// export const initialState: ApplicantState = {
//   applicants: [],
//   selectedApplicant: null
// };

// export const applicantReducer = createReducer(
//   initialState,
//   on(loadApplicantsSuccess, (state, { applicants }) => {
//     // console.log('Reducer loadApplicantsSuccess:', applicants);
//     return {
//       ...state,
//       applicants: applicants
//     };
//   }),
//   on(selectApplicant, (state, { username }) => {
//     const selected = state.applicants.find(applicant => applicant.username === username);
//     // console.log('Reducer selectApplicant:', selected);
//     return {
//       ...state,
//       selectedApplicant: selected || null
//     };
//   })
// );

import { createReducer, on } from '@ngrx/store';
import { loadApplicantsSuccess, selectApplicant } from './applicant-details.actions';
import { Applicant } from './applicant-details.model';

export interface ApplicantState {
  applicants: Applicant[];
  selectedApplicant: Applicant | null;
}

export const initialState: ApplicantState = {
  applicants: [],
  selectedApplicant: null
};

export const applicantReducer = createReducer(
  initialState,
  on(loadApplicantsSuccess, (state, { applicants }) => {
    return {
      ...state,
      applicants: applicants,
      selectedApplicant: state.selectedApplicant // Ensure selectedApplicant is not overridden
    };
  }),
  on(selectApplicant, (state, { username }) => {
    const selected = state.applicants.find(applicant => applicant.username === username);
    return {
      ...state,
      selectedApplicant: selected || null
    };
  })
);
