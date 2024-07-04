// src/app/store/auth.actions.ts

import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ username: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const register = createAction(
  '[Auth] Register',
  props<{ username: string; email: string; password: string; country: string }>()
);

export const registerSuccess = createAction('[Auth] Register Success');

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);


export const fetchUsername = createAction('[Auth] Fetch Username');

export const fetchUsernameSuccess = createAction(
  '[Auth] Fetch Username Success',
  props<{ username: string }>()
);