import { createAction, props } from '@ngrx/store';

export const setView = createAction(
  '[Secure Mail] Set View',
  props<{ view: 'compose' | 'inbox' | 'sent' }>()
);
