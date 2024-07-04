import { createReducer, on, Action } from '@ngrx/store';
import * as AccountActions from './account.actions';
import { Account } from './account.model';

export const accountFeatureKey = 'account';

export interface State {
  accounts: Account[];
  selectedAccount: Account | null;
  error: any;
}

const initialState: State = {
  accounts: [],
  selectedAccount: null,
  error: null,
};

const accountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccountsSuccess, (state, action) => ({
    ...state,
    accounts: action.accounts,
  })),
  on(AccountActions.loadAccountsFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AccountActions.loadAccountByUsernameSuccess, (state, action) => ({
    ...state,
    selectedAccount: action.account,
  })),
  on(AccountActions.loadAccountByUsernameFailure, (state, action) => ({
    ...state,
    error: action.error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return accountReducer(state, action);
}
