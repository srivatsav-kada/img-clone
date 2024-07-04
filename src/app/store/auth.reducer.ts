import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/auth.model';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  register,
  registerSuccess,
  registerFailure,
  fetchUsernameSuccess
} from './auth.actions';

export const initialAuthState: AuthState = {
  username: null,
  isAuthenticated: false,
  error: null,
};

const _authReducer = createReducer(
  initialAuthState,
  on(login, (state) => {
    console.log('Login action received, clearing error');
    return { ...state, error: null };
  }),
  on(loginSuccess, (state, { username }) => {
    console.log('Login successful, updating state with user', username);
    return { ...state, username, error: null };
  }),
  on(loginFailure, (state, { error }) => {
    console.log('Login failed, updating state with error', error);
    return { ...state, user: null, error };
  }),
  on(logout, (state) => ({
    ...state,
    username: null,
    isAuthenticated: false,
    error: null,
  })),
  on(register, (state) => ({ ...state, error: null })),
  on(registerSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fetchUsernameSuccess, (state, { username }) => ({
    ...state,
    username,
    error: null
  }))
);

export function authReducer(state: AuthState | undefined, action: any) {
  return _authReducer(state, action);
}
