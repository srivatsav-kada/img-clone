// src/app/store/auth.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { AuthState } from '../models/auth.model';

export const selectAuthState = (state: AppState) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectUsername = createSelector(
  selectAuthState,
  (state: AuthState) => state.username
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
