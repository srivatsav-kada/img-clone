import { createReducer, on } from '@ngrx/store';
import * as BlockedAccountActions from './blocked-account.actions';

export interface BlockedAccountState {
  // Define state properties here if needed
}

export const initialBlockedAccountState: BlockedAccountState = {
  // Initialize state properties here if needed
};

export const blockedAccountReducer = createReducer(
  initialBlockedAccountState,
  // Add case reducers here for handling actions
);
