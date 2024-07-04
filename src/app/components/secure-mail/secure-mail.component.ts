import { Component, OnInit } from '@angular/core';
import { SecureMailState, SecureMailView } from '../../store/secure-mail.reducer';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as SecureMailActions from '../../store/secure-mail.actions'
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-secure-mail',
  templateUrl: './secure-mail.component.html',
  styleUrl: './secure-mail.component.css'
})
export class SecureMailComponent implements OnInit {
  constructor(private store: Store<{ secureMail: SecureMailState }>,private authcheckdashboard : AuthService) {}
 ngOnInit(): void {
  this.authcheckdashboard.changeTitle('Secure Mail');
 }

  setView(view: SecureMailView) {
    this.store.dispatch(SecureMailActions.setView({ view }));
  }
}