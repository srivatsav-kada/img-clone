import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './beneficiary.reducer';

export const selectBeneficiaryState = createFeatureSelector<State>('beneficiaries');

export const selectAllBeneficiaries = createSelector(
  selectBeneficiaryState,
  (state: State) => state.beneficiaries
);

export const selectCurrentBeneficiary = createSelector(
  selectBeneficiaryState,
  (state: State) => state.selectedBeneficiary
);