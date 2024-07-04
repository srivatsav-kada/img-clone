import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import * as AccountActions from './account.actions';

@Injectable()
export class AccountEffects {
  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loadAccounts),
      mergeMap(() =>
        this.accountService.getAccountSummary().pipe(
          map((accounts) => AccountActions.loadAccountsSuccess({ accounts })),
          catchError((error) => of(AccountActions.loadAccountsFailure({ error })))
        )
      )
    )
  );

  loadAccountByUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loadAccountByUsername),
      mergeMap((action) =>
        this.accountService.getAccountByUsername(action.username).pipe(
          map((account) => AccountActions.loadAccountByUsernameSuccess({ account: account ?? null })),
          catchError((error) => of(AccountActions.loadAccountByUsernameFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private accountService: AccountService) {}
}
