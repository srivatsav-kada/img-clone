import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import * as BlockedAccountActions from './blocked-account.actions';

@Injectable()
export class BlockedAccountEffects {
  constructor(private actions$: Actions, private router: Router) {}

  navigateToApplyNow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedAccountActions.navigateToApplyNow),
      tap(() => {
        this.router.navigate(['home/applyNow']);
      })
    ),
    { dispatch: false }
  );

  navigateToSecureMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedAccountActions.navigateToSecureMail),
      tap(() => {
        this.router.navigate(['home/SecureMail']);
      })
    ),
    { dispatch: false }
  );
}
