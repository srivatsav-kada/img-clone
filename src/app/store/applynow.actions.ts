import { createAction, props } from '@ngrx/store';

export const saveFormData = createAction(
  '[Apply Now] Save Form Data',
  props<{ formData: any }>()
);

export const submitForm = createAction(
  '[Apply Now] Submit Form',
  props<{ formData: any }>()
);

export const submitFormSuccess = createAction('[Apply Now] Submit Form Success');
export const submitFormFailure = createAction(
  '[Apply Now] Submit Form Failure',
  props<{ error: any }>()
);

export const navigateToApplyUploadFiles = createAction('[Apply Now] Navigate to Apply Upload Files');
