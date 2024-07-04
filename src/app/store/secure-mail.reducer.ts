import { createReducer, on, Action } from '@ngrx/store';
import * as SecureMailActions from './secure-mail.actions';

export type SecureMailView = 'compose' | 'inbox' | 'sent';

export interface SecureMailState {
  currentView: SecureMailView;
}

export const initialState: SecureMailState = {
  currentView: 'inbox' // Default view
};

const reducer = createReducer(
  initialState,
  on(SecureMailActions.setView, (state, { view }) => ({ ...state, currentView: view }))
);

export function secureMailReducer(state: SecureMailState | undefined, action: Action) {
  return reducer(state, action);
}
