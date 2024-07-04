// import { Component, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable, filter, tap } from 'rxjs';
// import { Applicant } from '../../store/applicant-details.model';
// import { loadApplicants,selectApplicant } from '../../store/applicant-details.actions';
// import { selectAllApplicants, selectCurrentApplicant } from '../../store/applicant-details.selectors';
// import { AppState } from '../../models/app-state.model';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-activate-account-page',
//   templateUrl: './activate-account-page.component.html',
//   styleUrl: './activate-account-page.component.css'
// })
// export class ActivateAccountPageComponent implements OnInit {
//   applicants$!: Observable<Applicant[]>;
//   selectedApplicant$!: Observable<Applicant | null>;

//   constructor(private store: Store<AppState>, private router : Router) {
//     this.applicants$ = this.store.select(selectAllApplicants).pipe(
//       tap(applicants => console.log('Applicants Observable:', applicants))
//     );
//     this.selectedApplicant$ = this.store.select(selectCurrentApplicant).pipe(
//       tap(selectedApplicant => console.log('Selected Applicant Observable:', selectedApplicant))
//     );
//   }

//   ngOnInit(): void {
//     // Load applicants if not already loaded
//     this.applicants$.pipe(
//       tap(applicants => {
//         if (!applicants || applicants.length === 0) {
//           console.log('Dispatching loadApplicants action');
//           this.store.dispatch(loadApplicants());
//         }
//       }),
//       filter(applicants => !!applicants && applicants.length > 0),
//       tap(applicants => {
//         const username = 'one'; // Replace with actual logic to get logged-in username
//         console.log(`Dispatching selectApplicant action with username: ${username}`);
//         this.store.dispatch(selectApplicant({ username }));
//       })
//     ).subscribe();
//   }

//   goFurther(){
//     this.router.navigate(['/home/taxForm'])
//   }
// }

// kasfhkahskdfhsakdf3



// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';
// import { Applicant } from '../../store/applicant-details.model';
// import { loadApplicants,selectApplicant } from '../../store/applicant-details.actions';
// import { selectAllApplicants, selectCurrentApplicant } from '../../store/applicant-details.selectors';
// import { AppState } from '../../models/app-state.model';
// import { Router } from '@angular/router';


// import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatStepperModule} from '@angular/material/stepper';
// import {MatButtonModule} from '@angular/material/button';
// @Component({
//   selector: 'app-activate-account-page',
//   templateUrl: './activate-account-page.component.html',
//   styleUrl: './activate-account-page.component.css'
// })
// export class ActivateAccountPageComponent implements OnInit, OnDestroy {
//    selectedApplicantForm! : FormGroup;
//   applicants$!: Observable<Applicant[]>;
//   selectedApplicant$!: Observable<Applicant | null>;
//   private destroy$ = new Subject<void>();

//   constructor(private store: Store<AppState>,private router : Router,private fb:FormBuilder) {
//     this.applicants$ = this.store.select(selectAllApplicants).pipe(
//       // tap(applicants => console.log('Applicants Observable:', applicants))
//     );
//     this.selectedApplicant$ = this.store.select(selectCurrentApplicant).pipe(
//       // tap(selectedApplicant => console.log('Selected Applicant Observable:', selectedApplicant))
//     );
//   }

//   ngOnInit(): void {
//     // this.selectedApplicantForm = this.fb.group({
//     //   MothersName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
//     // });
//     this.applicants$.pipe(
//       takeUntil(this.destroy$), // Unsubscribe 
//       tap(applicants => {
//         if (!applicants || applicants.length === 0) {
//           // console.log('Dispatching loadApplicants action');
//           this.store.dispatch(loadApplicants());
//         }
//       }),
//       filter(applicants => !!applicants && applicants.length > 0),
//       tap(applicants => {
//         const username = 'one'; // Hardcoded here for testing purpose
//         // console.log('1')
//         this.store.dispatch(selectApplicant({ username }));
//       })
//     ).subscribe();
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

  
//   goFurther(){
//     this.router.navigate(['/home/taxForm'])
//   }

// }


// woringing here :


// import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable, Subject } from 'rxjs';
// import { Applicant } from '../../store/applicant-details.model';
// import { loadApplicants, selectApplicant } from '../../store/applicant-details.actions';
// import { selectAllApplicants, selectCurrentApplicant } from '../../store/applicant-details.selectors';
// import { AppState } from '../../models/app-state.model';
// import { Router } from '@angular/router';
// import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { takeUntil, filter, tap, first } from 'rxjs/operators';

// @Component({
//   selector: 'app-activate-account-page',
//   templateUrl: './activate-account-page.component.html',
//   styleUrls: ['./activate-account-page.component.css']
// })
// export class ActivateAccountPageComponent implements OnInit, OnDestroy {
//   @Output() formSubmit = new EventEmitter<Applicant>();
//   selectedApplicantForm!: FormGroup;
//   applicants$!: Observable<Applicant[]>;
//   selectedApplicant$!: Observable<Applicant | null>;
//   private destroy$ = new Subject<void>();

//   constructor(
//     private store: Store<AppState>,
//     private router: Router,
//     private fb: FormBuilder
//   ) {
//     this.applicants$ = this.store.select(selectAllApplicants);
//     this.selectedApplicant$ = this.store.select(selectCurrentApplicant);
//   }

//   ngOnInit(): void {
//     this.selectedApplicantForm = this.fb.group({
//       firstName: [{ value: '', disabled: true }],
//       lastName: [{ value: '', disabled: true }],
//       MothersName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
//       addressLine1: [''],
//       City: [''],
//       PostalCode: [''],
//       Country: [{ value: '', disabled: true }],
//       Mobile: ['']
//     });

//     // Dispatch loadApplicants if there are no applicants
//     this.applicants$.pipe(
//       takeUntil(this.destroy$),
//       tap(applicants => {
//         if (!applicants || applicants.length === 0) {
//           this.store.dispatch(loadApplicants());
//         }
//       }),
//       filter(applicants => !!applicants && applicants.length > 0),
//       first()  // Only take the first value to avoid infinite loop
//     ).subscribe(() => {
//       const username = 'one'; // Hardcoded here for testing purpose
//       this.store.dispatch(selectApplicant({ username }));
//     });

//     // Subscribe to selected applicant changes
//     this.selectedApplicant$.pipe(
//       takeUntil(this.destroy$)
//     ).subscribe(selectedApplicant => {
//       if (selectedApplicant) {
//         this.selectedApplicantForm.patchValue({
//           firstName: selectedApplicant.firstName,
//           lastName: selectedApplicant.lastName,
//           MothersName: selectedApplicant.MothersName,
//           addressLine1: selectedApplicant.Address,
//           City: selectedApplicant.City,
//           PostalCode: selectedApplicant.PostalCode,
//           Country: selectedApplicant.Country,
//           Mobile: selectedApplicant.Mobile
//         });
//       }
//     });
//     if (this.selectedApplicantForm.valid) {
//       this.formSubmit.emit(this.selectedApplicantForm.getRawValue() as Applicant);
//     }

//     // this.selectedApplicantForm.valueChanges.subscribe(value => {
//     //   localStorage.setItem('selectedApplicantFormData', JSON.stringify(this.selectedApplicantForm.value));
//     //   // console.log(this.registrationForm)
//     //   console.log('1')
//     // });
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   goFurther() {
//     this.router.navigate(['/home/taxForm']);
//   }
// }

// activate-account-page.component.ts
import { Component, EventEmitter, OnInit, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Applicant } from '../../store/applicant-details.model';
import { loadApplicants, selectApplicant } from '../../store/applicant-details.actions';
import { selectAllApplicants, selectCurrentApplicant } from '../../store/applicant-details.selectors';
import { AppState } from '../../models/app-state.model';
import { Router } from '@angular/router';
import { takeUntil, filter, tap, first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate-account-page',
  templateUrl: './activate-account-page.component.html',
  styleUrls: ['./activate-account-page.component.css']
})
export class ActivateAccountPageComponent implements OnInit, OnDestroy,AfterViewInit {
  @Output() formSubmit = new EventEmitter<Applicant>();
  selectedApplicantForm!: FormGroup;
  applicants$!: Observable<Applicant[]>;
  selectedApplicant$!: Observable<Applicant | null>;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    private authcheckdashboard : AuthService
  ) {
    this.applicants$ = this.store.select(selectAllApplicants);
    this.selectedApplicant$ = this.store.select(selectCurrentApplicant);
  }

  ngOnInit(): void {
    this.selectedApplicantForm = this.fb.group({
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      MothersName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      addressLine1: [''],
      City: [''],
      PostalCode: [''],
      Country: [{ value: '', disabled: true }],
      Mobile: ['']
    });

    this.applicants$.pipe(
      takeUntil(this.destroy$),
      tap(applicants => {
        if (!applicants || applicants.length === 0) {
          this.store.dispatch(loadApplicants());
        }
      }),
      filter(applicants => !!applicants && applicants.length > 0),
      first()
    ).subscribe(() => {
      const username = 'one';
      this.store.dispatch(selectApplicant({ username }));
    });

    this.selectedApplicant$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(selectedApplicant => {
      if (selectedApplicant) {
        console.log('selectedApplicant:', selectedApplicant);
        this.selectedApplicantForm.patchValue({
          firstName: selectedApplicant.firstName,
          lastName: selectedApplicant.lastName,
          MothersName: selectedApplicant.MothersName,
          addressLine1: selectedApplicant.Address,
          City: selectedApplicant.City,
          PostalCode: selectedApplicant.PostalCode,
          Country: selectedApplicant.Country,
          Mobile: selectedApplicant.Mobile
        });
      }
    });

      // Subscribe to valueChanges and emit form data
      this.selectedApplicantForm.valueChanges.pipe(
        takeUntil(this.destroy$)
      ).subscribe(value => {
        console.log('Form value changes:', value);
        this.formSubmit.emit(this.selectedApplicantForm.getRawValue() as Applicant);
      });

      this.authcheckdashboard.changeTitle('Activate Account');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit() {
    this.authcheckdashboard.changeTitle('Activate Account');
  }

  // onNext() {
  //   if (this.selectedApplicantForm.valid) {
  //     console.log('Form valid, emitting value:', this.selectedApplicantForm.getRawValue());
  //     this.formSubmit.emit(this.selectedApplicantForm.getRawValue() as Applicant);
  //   }
  // }

  goFurther() {
    this.router.navigate(['/home/taxForm']);
  }
}
