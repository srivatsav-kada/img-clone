// src/app/store/actions/beneficiary.actions.ts
import { createAction, props } from '@ngrx/store';

import { Beneficiary } from '../components/view-beneficiary/beneficiary.model';

export const loadBeneficiaries = createAction('[Beneficiary] Load Beneficiaries');
export const loadBeneficiariesSuccess = createAction(
  '[Beneficiary] Load Beneficiaries Success',
  props<{ beneficiaries: Beneficiary[] }>()
);
export const selectBeneficiary = createAction(
  '[Beneficiary] Select Beneficiary',
  props<{ beneficiary: Beneficiary }>()
);