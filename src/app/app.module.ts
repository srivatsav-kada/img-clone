// import { NgModule, isDevMode } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { itemReducer } from './store/item.reducer';
// import { counterReducer } from './store/counter.reducer';
// import { CounterComponent } from './components/counter/counter.component';

// import { authReducer } from './store/auth.reducer';
// import { routes } from './app-routing.module';

// import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
// import { FormsComponent } from './components/forms/forms.component';
// import { LoginformComponent } from './components/loginform/loginform.component';
// import { RegistrationformComponent } from './components/registrationform/registrationform.component';
// import { CommonModule } from '@angular/common';
// import { NgForm,FormsModule } from '@angular/forms';

// @NgModule({
//   declarations: [
//     AppComponent,
//     CounterComponent,
//     FormsComponent,
//     LoginformComponent,
//     RegistrationformComponent
//   ],
//   imports: [
//     CommonModule,
//     BrowserModule,
//     AppRoutingModule,
//     StoreModule.forRoot({}, {}),
//     StoreModule.forRoot({ items: itemReducer,counter: counterReducer,auth: authReducer  }),
//     StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })

//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { itemReducer } from './store/item.reducer';
import { counterReducer } from './store/counter.reducer';
import { CounterComponent } from './components/counter/counter.component';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth.reducer';
import { routes } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { RegistrationformComponent } from './components/registrationform/registrationform.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/auth.effects';
import { HomeComponent } from './components/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatButtonModule} from '@angular/material/button';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BlockedAccountComponent } from './components/blocked-account/blocked-account.component';

import { ApplynowComponent } from './components/applynow/applynow.component';
import { FormGroup, ReactiveFormsModule , FormBuilder, Validators } from '@angular/forms';
import { ApplyUploadFilesComponent } from './components/apply-upload-files/apply-upload-files.component';
import { SecureMailComponent } from './components/secure-mail/secure-mail.component';
import { MailListComponent } from './components/mail-list/mail-list.component';
import { MailDetailComponent } from './components/mail-detail/mail-detail.component';
import { ComposeMailComponent } from './components/compose-mail/compose-mail.component';
import { MailService } from './mail.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSelectDropdownComponent } from 'ngx-select-dropdown';
import { blockedAccountReducer } from './store/blocked-account.reducer';
import { BlockedAccountEffects } from './store/blocked-account.effects';
import { applyNowReducer } from './store/applynow.reducer';
import { ApplyNowEffects } from './store/applynow.effects';
import { applyUploadReducer } from './store/apply-upload.reducer';
import { ApplyUploadEffects } from './store/apply-upload.effects';
import { secureMailReducer } from './store/secure-mail.reducer';
import { SecureMailEffects } from './store/secure-mail.effects';
import { DialogboxComponent } from './components/dialogbox/dialogbox.component';
import { CustomValidators } from './store/validators';
import { MailInboxComponent } from './components/mail-inbox/mail-inbox.component';

import { FilePreviewServiceService } from './services/file-preview-service.service';
import { FilePreviewPopupComponent } from './components/file-preview-popup/file-preview-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeUrlPipe } from './safe-url.pipe';
import { applicantReducer } from './store/applicant-details.reducer';
import { ApplicantEffects } from './store/applicant-details.effects';
import { ActivateAccountPageComponent } from './components/activate-account-page/activate-account-page.component';
import { ApplicantDetailsNewService } from './services/applicant-details-new.service';
import { TaxFormComponent } from './components/tax-form/tax-form.component';

import { ActivateAccountPasswordComponent } from './components/activate-account-password/activate-account-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { TransfermoneyComponent } from './components/transfermoney/transfermoney.component';
import { ViewBeneficiaryComponent } from './components/view-beneficiary/view-beneficiary.component';
import { beneficiaryReducer } from './store/beneficiary.reducer';
import { BeneficiaryEffects } from './store/beneficiary.effects';
import { ViewBeneficiaryDetailsComponent } from './components/view-beneficiary-details/view-beneficiary-details.component';
import { BeneficiaryService } from './services/beneficiary.service';
import { SendmoneyComponent } from './components/sendmoney/sendmoney.component';
import * as fromAccount from './store/account.reducer';
import { AccountEffects } from './store/account.effects';
import { AccountService } from './services/account.service';
import { FileService } from './services/file.service';
import { FileAccessComponent } from './components/file-access/file-access.component';
import { SendmoneyConfirmationComponent } from './components/sendmoney-confirmation/sendmoney-confirmation.component';
import { OtpComponent } from './components/otp/otp.component';
import { otpReducer } from './store/otp.reducer';
import { OtpEffects } from './store/otp.effects';
import { TransfersuccessComponent } from './components/transfersuccess/transfersuccess.component';




@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    FormsComponent,
    LoginformComponent,
    RegistrationformComponent,
    HomeComponent,
    HomePageComponent,
    BlockedAccountComponent,
    ApplynowComponent,
    ApplyUploadFilesComponent,
    SecureMailComponent,
    MailListComponent,
    MailDetailComponent,
    ComposeMailComponent,
    DialogboxComponent,
    MailInboxComponent,
    FilePreviewPopupComponent,
    SafeUrlPipe,
    ActivateAccountPageComponent,
    TaxFormComponent,
    ActivateAccountPasswordComponent,
    StepperComponent,
    TransfermoneyComponent,
    ViewBeneficiaryComponent,
    ViewBeneficiaryDetailsComponent,
    SendmoneyComponent,
    FileAccessComponent,
    SendmoneyConfirmationComponent,
    OtpComponent,
    TransfersuccessComponent,
    
    
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    FormsModule, 
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot({ items: itemReducer, counter: counterReducer, auth: authReducer,blockedAccount: blockedAccountReducer ,applyNow :applyNowReducer,applyUpload: applyUploadReducer ,secureMail: secureMailReducer, applicants: applicantReducer,beneficiaries: beneficiaryReducer, [fromAccount.accountFeatureKey]: fromAccount.reducer,otp: otpReducer  }),
    EffectsModule.forRoot([AuthEffects,BlockedAccountEffects,ApplyNowEffects,ApplyUploadEffects,SecureMailEffects, ApplicantEffects,BeneficiaryEffects,AccountEffects,OtpEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
    FontAwesomeModule 
  ],
  providers: [AuthService, provideAnimationsAsync(),MailService,FilePreviewServiceService,ApplicantDetailsNewService,BeneficiaryService,AccountService,FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
