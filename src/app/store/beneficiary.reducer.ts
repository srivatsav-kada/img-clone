// src/app/store/reducers/beneficiary.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import * as BeneficiaryActions from './beneficiary.actions';
import { Beneficiary } from '../components/view-beneficiary/beneficiary.model';


export interface State {
    beneficiaries: Beneficiary[];
    selectedBeneficiary: Beneficiary | null;
  }
  
  export const initialState: State = {
    beneficiaries: [],
    selectedBeneficiary: null
  };
  
  const _beneficiaryReducer = createReducer(
    initialState,
    on(BeneficiaryActions.loadBeneficiariesSuccess, (state, { beneficiaries }) => ({
      ...state,
      beneficiaries
    })),
    on(BeneficiaryActions.selectBeneficiary, (state, { beneficiary }) => ({
      ...state,
      selectedBeneficiary: beneficiary
    }))
  );
  
  export function beneficiaryReducer(state: State | undefined, action: Action): State {
    return _beneficiaryReducer(state, action);
  }