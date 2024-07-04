// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { ActivatedRoute, Router } from '@angular/router';
// import { OtpComponent } from '../otp/otp.component';
// import { Observable, Subscription } from 'rxjs';
// import { Store } from '@ngrx/store';
// import { Account } from '../../store/account.model';
// import { AccountService } from '../../services/account.service';
// import * as fromAccount from '../../store/account.reducer';
// import * as AccountSelectors from '../../store/account.selectors';
// import * as AccountActions from '../../store/account.actions';
// import { AuthService } from '../../services/auth.service';
// @Component({
//   selector: 'app-sendmoney-confirmation',
//   templateUrl: './sendmoney-confirmation.component.html',
//   styleUrl: './sendmoney-confirmation.component.css'
// })
// export class SendmoneyConfirmationComponent implements OnInit,OnDestroy {

// paymentDetails: any;
// selectedAccount$: Observable<Account | null>;
// accountSubscription: Subscription | null = null;

// constructor(
//   private route: ActivatedRoute, 
//   private router: Router,
//   public dialog: MatDialog,
//   private store: Store<fromAccount.State>,
//   private accountService: AccountService,
//   private authcheckdashboard: AuthService
// ) {
//   this.selectedAccount$ = this.store.select(AccountSelectors.selectSelectedAccount);
// }

// ngOnInit(): void {
//   // this.route.queryParams.subscribe(params => {
//   //   this.paymentDetails = JSON.parse(params['data']);
//   // });

//   const navigation = this.router.getCurrentNavigation();
//   if (navigation?.extras.state?.['data']) {
//     this.paymentDetails = navigation.extras.state?.['data'];
//     console.log('Received payment details:', this.paymentDetails);
//   } else {
//     console.error('No payment details found, redirecting...');
//     // this.router.navigate(['/home/sendMoney']);
//   }


//   this.authcheckdashboard.changeTitle('Send Money Confirmation');
// }

// ngOnDestroy(): void {
//   if (this.accountSubscription) {
//     this.accountSubscription.unsubscribe();
//   }
// }

// onSubmit(): void {
//   console.log('Payment confirmed:', this.paymentDetails);

//   if (this.accountSubscription) {
//     this.accountSubscription.unsubscribe();
//   }

//   this.accountSubscription = this.selectedAccount$.subscribe((account: Account | null) => {
//     if (account) {
//       console.log('Selected Account balance:', account.balance);
//       if (this.paymentDetails.amount > (account.balance || 0)) {
//         console.log('Insufficient balance');
//         alert('Insufficient balance');
//       } else {
//         console.log('Proceeding with form submission');
//         const updatedAccount = {
//           ...account,
//           balance: (account.balance || 0) - this.paymentDetails.amount
//         };
//         this.accountService.updateAccountBalance(account.id, updatedAccount).subscribe(
//           (updatedAccount) => {
//             console.log('Account balance updated successfully:', updatedAccount);
//             // You can dispatch an action or update local state if needed
//             alert('Transaction successful');
//             this.router.navigate(['/home/transferMoneyHome']); // Navigate to home or any other page
//           },
//           (error) => {
//             console.error('Failed to update account balance:', error);
//             alert('Transaction failed');
//           }
//         );
//       }
//     }
//   });
// }


// openOtpDialog(): void {
//   const dialogRef = this.dialog.open(OtpComponent, {
//     width: '35%'
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result === 'verified') {
//       console.log('OTP verified successfully');
//       this.onSubmit();
//     } else {
//       console.log('OTP verification failed');
//     }
//   });
// }
// }
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OtpComponent } from '../otp/otp.component';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Account } from '../../store/account.model';
import { AccountService } from '../../services/account.service';
import * as fromAccount from '../../store/account.reducer';
import * as AccountSelectors from '../../store/account.selectors';
import * as AccountActions from '../../store/account.actions';
import { AuthService } from '../../services/auth.service';
import { ApplicantDetailsNewService } from '../../services/applicant-details-new.service';

@Component({
  selector: 'app-sendmoney-confirmation',
  templateUrl: './sendmoney-confirmation.component.html',
  styleUrls: ['./sendmoney-confirmation.component.css']
})
export class SendmoneyConfirmationComponent implements OnInit, OnDestroy {
  paymentDetails: any;
  selectedAccount$: Observable<Account | null>;
  accountSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store: Store<fromAccount.State>,
    private accountService: AccountService,
    private authcheckdashboard: AuthService,
    private paymentService: ApplicantDetailsNewService
  ) {
    this.selectedAccount$ = this.store.select(AccountSelectors.selectSelectedAccount);
  }

  ngOnInit(): void {
    this.paymentDetails = this.paymentService.getPaymentDetails();
    if (!this.paymentDetails) {
      console.error('No payment details found, redirecting...');
      // this.router.navigate(['/home/sendMoney']);
      
    }
    this.authcheckdashboard.changeTitle('Send Money Confirmation');
  }

  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    console.log('Payment confirmed:', this.paymentDetails);

    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }

    this.accountSubscription = this.selectedAccount$.subscribe((account: Account | null) => {
      if (account) {
        console.log('Selected Account balance:', account.balance);
        if (this.paymentDetails.amount > (account.balance || 0)) {
          console.log('Insufficient balance');
          alert('Insufficient balance');
        } else {
          console.log('Proceeding with form submission');
          const updatedAccount = {
            ...account,
            balance: (account.balance || 0) - this.paymentDetails.amount
          };
          this.accountService.updateAccountBalance(account.id, updatedAccount).subscribe(
            (updatedAccount) => {
              console.log('Account balance updated successfully:', updatedAccount);
              // alert('Transaction successful');
              // this.router.navigate(['/home/transferMoneyHome']); // Navigate to home or any other page
              
              this.router.navigate(['/home/transferSuccess']); // Navigate to home or any other page
            },
            (error) => {
              console.error('Failed to update account balance:', error);
              // alert('Transaction failed');
            }
          );
        }
      }
    });
  }

  openOtpDialog(): void {
    const dialogRef = this.dialog.open(OtpComponent, {
      width: '35%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'verified') {
        console.log('OTP verified successfully');
        this.onSubmit();
      } else {
        console.log('OTP verification failed');
      }
    });
  }
}
