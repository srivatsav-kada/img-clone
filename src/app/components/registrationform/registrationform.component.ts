import { Component } from '@angular/core';

import { FormsModule,NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state.model';
import { NgModule } from '@angular/core';
import * as AuthActions from '../../store/auth.actions';
import { CommonModule } from '@angular/common';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';

@Component({

  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrl: './registrationform.component.css'
})
export class RegistrationformComponent {
  constructor(private store: Store<AppState>,private dialog: MatDialog) {}

  onSubmit(form: NgForm) {
    console.log('78646')
    if (form.valid) {
      console.log('sdfdsdffd')
      const { username, email, country, password } = form.value;
      this.store.dispatch(
        AuthActions.register({ username, email, country, password })
      );
    } else {
      console.log('sfd')
      this.openRegistrationFailedDialog('Please fill out all fields correctly.');
    }
  }
  openRegistrationFailedDialog(errorMessage: string): void {
    this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: { errorMessage }
    });
  }

}