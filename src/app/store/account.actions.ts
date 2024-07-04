import { createAction, props } from '@ngrx/store';
import { Account } from './account.model';

export const loadAccounts = createAction('[Account] Load Accounts');
export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Success',
  props<{ accounts: Account[] }>()
);
export const loadAccountsFailure = createAction(
  '[Account] Load Accounts Failure',
  props<{ error: any }>()
);

export const loadAccountByUsername = createAction(
  '[Account] Load Account By Username',
  props<{ username: string }>()
);
export const loadAccountByUsernameSuccess = createAction(
  '[Account] Load Account By Username Success',
  props<{ account: Account | null }>()
);
export const loadAccountByUsernameFailure = createAction(
  '[Account] Load Account By Username Failure',
  props<{ error: any }>()
);
