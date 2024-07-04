import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ApplyNowActions from '../store/applynow.actions';

@Injectable()
export class ApplyNowEffects {
  constructor(private actions$: Actions, private router: Router) {}

  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyNowActions.submitForm),
      switchMap(action => {
        return of({ success: true }).pipe(
          map(() => ApplyNowActions.submitFormSuccess()),
          catchError(error => of(ApplyNowActions.submitFormFailure({ error })))
        );
      })
    )
  );

  navigateToApplyUploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyNowActions.submitFormSuccess),
      tap(() => this.router.navigate(['/home/applyUploadFiles']))
    ),
    { dispatch: false }
  );
}
