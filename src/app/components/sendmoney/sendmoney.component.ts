import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromAccount from '../../store/account.reducer';
import * as AccountSelectors from '../../store/account.selectors';
import * as AccountActions from '../../store/account.actions';
import { Observable } from 'rxjs';
import { Account } from '../../store/account.model';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApplicantDetailsNewService } from '../../services/applicant-details-new.service';

@Component({
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.component.html',
  styleUrls: ['./sendmoney.component.css']
})
export class SendmoneyComponent implements OnInit {
  sendMoneyForm: FormGroup;
  beneficiaryTypes = ['dectest', 'bvcf', 'externalwed'];
  frequencies = ['daily', 'weekly', 'biweekly', 'monthly', 'yearly'];
  selectedAccount$: Observable<Account | null>;

  constructor(
    private store: Store<fromAccount.State>,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private authcheckdashboard: AuthService,
    private paymentService: ApplicantDetailsNewService
  ) {
    this.sendMoneyForm = this.fb.group({
      debitAccount: [{ value: '', disabled: true }, Validators.required],
      beneficiaryType: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      purpose: [''],
      transferType: ['immediate', Validators.required],
      scheduledDate: [''],
      frequency: [''],
      startDate: [''],
      installments: ['']
    });
    this.selectedAccount$ = this.store.select(AccountSelectors.selectSelectedAccount);
  }

  ngOnInit(): void {
    const username = 'one'; // Replace with actual username or fetch dynamically
    console.log('Dispatching loadAccountByUsername action');
    this.store.dispatch(AccountActions.loadAccountByUsername({ username }));

    this.selectedAccount$.subscribe((account: Account | null) => {
      if (account) {
        console.log('Selected Account:', account);
        console.log('IBAN:', account.IBAN); // Log the IBAN
        this.sendMoneyForm.patchValue({
          debitAccount: account.IBAN
        });
      } else {
        console.log('Account not found for username:', username);
      }
    });

    this.authcheckdashboard.changeTitle('Send Money');
  }

  onNext(): void {
    if (this.sendMoneyForm.valid) {
      const formValues = this.sendMoneyForm.getRawValue();
      console.log('kadfknk')
      console.log(formValues)
      this.paymentService.setPaymentDetails(formValues);
      this.router.navigate(['/home/sendMoneyConfirmation']);
    }
  }

  onSubmit(): void {
    if (this.sendMoneyForm.valid) {
      const formValues = this.sendMoneyForm.getRawValue();
      console.log('Form Submitted with values:', formValues);

      this.selectedAccount$.subscribe((account: Account | null) => {
        if (account) {
          console.log('Selected Account balance:', account.balance);
          if (formValues.amount > (account.balance || 0)) { // Handle balance if it's optional
            console.log('Insufficient balance');
            alert('Insufficient balance');
          } else {
            console.log('Proceeding with form submission');
            const updatedAccount = {
              ...account,
              balance: (account.balance || 0) - formValues.amount
            };
            this.accountService.updateAccountBalance(account.id, updatedAccount).subscribe(
              (updatedAccount) => {
                console.log('Account balance updated successfully:', updatedAccount);
                // You can dispatch an action or update local state if needed
              },
              (error) => {
                console.error('Failed to update account balance:', error);
              }
            );
          }
        }
      });
    }
  }
}
