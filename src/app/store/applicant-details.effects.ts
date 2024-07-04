
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// // import { ApplicantService } from '../services/applicant.service';
// import { ApplicantDetailsNewService } from '../services/applicant-details-new.service';
// // import { loadApplicants, loadApplicantsSuccess, selectApplicant } from '../actions/applicant.actions';
// import { loadApplicants,loadApplicantsSuccess, selectApplicant } from './applicant-details.actions';

// @Injectable()
// export class ApplicantEffects {
//   loadApplicants$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadApplicants),
//       mergeMap(() => {
//         // console.log('2');
//         return this.applicantService.getApplicants()
//           .pipe(
//             map(applicants => {
//               // console.log('3');
//               return loadApplicantsSuccess({ applicants });
//             }),
//             catchError((error) => {
//               console.error('Error loading applicants:', error);
//               return of({ type: '[Applicant API] Applicants Loaded Error' });
//             })
//           );
//       })
//     )
//   );

//   selectApplicant$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(selectApplicant),
//       mergeMap(action => {
//         // console.log('4');
//         return this.applicantService.getApplicantByUsername(action.username)
//           .pipe(
//             map(applicants => {
//               const applicant = applicants[0]; // Assuming the response is an array with a single applicant
//               // console.log('5');
//               return loadApplicantsSuccess({ applicants: [applicant] });
//             }),
//             catchError((error) => {
//               console.error(`Error loading applicant with username ${action.username}:`, error);
//               return of({ type: '[Applicant API] Applicant Loaded Error' });
//             })
//           );
//       })
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private applicantService: ApplicantDetailsNewService
//   ) {}
// }

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApplicantDetailsNewService } from '../services/applicant-details-new.service';
import { loadApplicants, loadApplicantsSuccess, selectApplicant } from './applicant-details.actions';

@Injectable()
export class ApplicantEffects {
  loadApplicants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApplicants),
      mergeMap(() => {
        return this.applicantService.getApplicants().pipe(
          map(applicants => {
            return loadApplicantsSuccess({ applicants });
          }),
          catchError(error => {
            console.error('Error loading applicants:', error);
            return of({ type: '[Applicant API] Applicants Loaded Error' });
          })
        );
      })
    )
  );

  selectApplicant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectApplicant),
      mergeMap(action => {
        return this.applicantService.getApplicantByUsername(action.username).pipe(
          map(applicants => {
            const applicant = applicants[0]; // Assuming the response is an array with a single applicant
            return loadApplicantsSuccess({ applicants: [applicant] });
          }),
          catchError(error => {
            console.error(`Error loading applicant with username ${action.username}:`, error);
            return of({ type: '[Applicant API] Applicant Loaded Error' });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private applicantService: ApplicantDetailsNewService
  ) {}
}
