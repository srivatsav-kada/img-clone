// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
  
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

// src/app/app.route.ts

import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './components/forms/forms.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { RegistrationformComponent } from './components/registrationform/registrationform.component';
import { Component, NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BlockedAccountComponent } from './components/blocked-account/blocked-account.component';

import { ApplynowComponent } from './components/applynow/applynow.component';
import { ApplyUploadFilesComponent } from './components/apply-upload-files/apply-upload-files.component';
import { SecureMailComponent } from './components/secure-mail/secure-mail.component';
import { MailDetailComponent } from './components/mail-detail/mail-detail.component';
import { ComposeMailComponent } from './components/compose-mail/compose-mail.component';
import { MailListComponent } from './components/mail-list/mail-list.component';

import { MailInboxComponent } from './components/mail-inbox/mail-inbox.component';
import { ActivateAccountPageComponent } from './components/activate-account-page/activate-account-page.component';
import { TaxFormComponent } from './components/tax-form/tax-form.component';
import { ActivateAccountPasswordComponent } from './components/activate-account-password/activate-account-password.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TransfermoneyComponent } from './components/transfermoney/transfermoney.component';
import { ViewBeneficiaryComponent } from './components/view-beneficiary/view-beneficiary.component';
import { ViewBeneficiaryDetailsComponent } from './components/view-beneficiary-details/view-beneficiary-details.component';
import { SendmoneyComponent } from './components/sendmoney/sendmoney.component';
import { FileAccessComponent } from './components/file-access/file-access.component';
import { SendmoneyConfirmationComponent } from './components/sendmoney-confirmation/sendmoney-confirmation.component';
import { TransfersuccessComponent } from './components/transfersuccess/transfersuccess.component';
export const routes: Routes = [
  { path: '', redirectTo: 'forms/login', pathMatch: 'full' },
  {
    path: 'forms',
    component: FormsComponent,
    children: [
      { path: 'login', component: LoginformComponent },
      { path: 'register', component: RegistrationformComponent },
      // { path: 'confirmregister', component: ConfirmRegistrationComponent },
    ],
  },
  {
    path : 'home',
    component : HomeComponent,
    children:[
      {path : 'homePage' ,component:HomePageComponent},
      {path : 'blockedAccount' , component : BlockedAccountComponent},
     
      {path : 'applyNow',component : ApplynowComponent},
      {path : 'applyUploadFiles',component : ApplyUploadFilesComponent},
      {path : 'SecureMail',component :SecureMailComponent,
        children :[
          { path: 'inbox', component: MailInboxComponent },
          { path: 'sent', component: MailListComponent },
          {path : 'mail/:id',component : MailDetailComponent},
          {path : 'compose',component : ComposeMailComponent}
        ]
      },
      {path : 'activateAccount',component : ActivateAccountPageComponent},
      {path : 'taxForm',component : TaxFormComponent},
      {path : 'activateAccountPswd' , component : ActivateAccountPasswordComponent},
      {path : 'ActivateAccountDE' , component : StepperComponent},
      {path : 'transferMoneyHome' , component : TransfermoneyComponent},
      {path : 'viewBeneficiary' , component : ViewBeneficiaryComponent},
      { path: 'details', component: ViewBeneficiaryDetailsComponent },
      { path: 'sendMoney', component: SendmoneyComponent },
      { path: 'sendMoneyConfirmation', component: SendmoneyConfirmationComponent },
      { path: 'FileAccess', component: FileAccessComponent },
      { path: 'transferSuccess', component: TransfersuccessComponent }


     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }