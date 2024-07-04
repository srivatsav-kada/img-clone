import { Component } from '@angular/core';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state.model';
import * as AuthActions from '../../store/auth.actions';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {


  // constructor(private store: Store<AppState>,private dialog: MatDialog) {}
  constructor(private store: Store,private dialog: MatDialog) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('yes')
      const { username, password } = form.value;
      console.log('Form is valid, dispatching login action', { username, password });
      this.store.dispatch(AuthActions.login({ username, password }));
    }else{
  
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