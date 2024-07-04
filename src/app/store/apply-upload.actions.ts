import { createAction, props } from '@ngrx/store';

export const uploadFile = createAction(
  '[Apply Upload] Upload File',
  props<{ file: File }>()
);

export const uploadFileSuccess = createAction(
  '[Apply Upload] Upload File Success',
  props<{ fileUrl: string }>()
);

export const uploadFileFailure = createAction(
  '[Apply Upload] Upload File Failure',
  props<{ error: any }>()
);

export const clearFile = createAction('[Apply Upload] Clear File');

export const loadFile = createAction('[Apply Upload] Load File');
export const loadFileSuccess = createAction(
  '[Apply Upload] Load File Success',
  props<{ file: File, fileUrl: string }>()
);
export const loadFileFailure = createAction(
  '[Apply Upload] Load File Failure',
  props<{ error: any }>()
);

export const submitForm = createAction('[Apply Upload] Submit Form');

export const submitFormSuccess = createAction(
  '[Apply Upload] Submit Form Success'
);

export const submitFormFailure = createAction(
  '[Apply Upload] Submit Form Failure',
  props<{ error: any }>()
);