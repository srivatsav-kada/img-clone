// src/app/store/effects/beneficiary.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BeneficiaryService } from '../services/beneficiary.service';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as BeneficiaryActions from './beneficiary.actions';
import { Beneficiary } from '../components/view-beneficiary/beneficiary.model';

@Injectable()
export class BeneficiaryEffects {
  loadBeneficiaries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BeneficiaryActions.loadBeneficiaries),
      mergeMap(() =>
        this.beneficiaryService.getBeneficiaries().pipe(
          map((beneficiaries: Beneficiary[]) => BeneficiaryActions.loadBeneficiariesSuccess({ beneficiaries })),
          catchError(() => of({ type: '[Beneficiary] Load Beneficiaries Failure' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private beneficiaryService: BeneficiaryService
  ) {}
}