import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadBeneficiaries, selectBeneficiary } from '../../store/beneficiary.actions';
import { selectAllBeneficiaries, selectCurrentBeneficiary } from '../../store/beneficiary.selectors';
import { Beneficiary } from './beneficiary.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-beneficiary',
  templateUrl: './view-beneficiary.component.html',
  styleUrl: './view-beneficiary.component.css'
})
export class ViewBeneficiaryComponent implements OnInit {
  beneficiaries$!: Observable<Beneficiary[]>;

  constructor(private store: Store<any>, private router: Router,private authcheckdashboard: AuthService) {}

  ngOnInit(): void {
    this.store.dispatch(loadBeneficiaries());
    this.beneficiaries$ = this.store.select(selectAllBeneficiaries);
    this.authcheckdashboard.changeTitle('Beneficiary Details');
  }

  onDetailsClick(beneficiary: Beneficiary): void {
    this.store.dispatch(selectBeneficiary({ beneficiary }));
    this.router.navigate(['home/details']);
  }
}