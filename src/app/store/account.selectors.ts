import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './account.reducer';
import { Account } from './account.model';

export const selectAccountState = createFeatureSelector<State>('account');

export const selectSelectedAccount = createSelector(
  selectAccountState,
  (state: State) => state.selectedAccount
);
