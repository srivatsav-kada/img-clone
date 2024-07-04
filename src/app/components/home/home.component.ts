import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state.model';
import * as AuthActions from '../../store/auth.actions';
import { selectUsername } from '../../store/auth.selectors';
import {formatDate } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
// export class HomeComponent {
//   username :any
// }

export class HomeComponent implements OnInit {
  username$ = this.store.select(selectUsername);
  unamestored : string =''
  toolbarTitle: string = 'ICICI Bank Hello Europe Account';
  
  today: number = Date.now();

  // constructor(private store: Store<AppState>) {}
  constructor(private store: Store<AppState>,private router : Router,private authcheckdashboard : AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.store.dispatch(AuthActions.fetchUsername());

    this.username$.subscribe(username => {
      this.unamestored = username!;
      console.log('Username updated:', this.unamestored);
      console.log(localStorage.getItem('usernamestored'))
    });
    
    this.authcheckdashboard.currentTitle.subscribe(title => {
      this.toolbarTitle = title;
      this.cdr.detectChanges(); 
    });
  }
  logoutMeth(){
    localStorage.setItem('usernamestored', this.unamestored);
    console.log(this.unamestored)
    console.log(localStorage.getItem('usernamestored'))
    this.router.navigate(['/forms/login'])
    
  }

  
}