import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './models/item.model';
import { addItem, removeItem } from './store/item.actions';
import { increment, decrement, reset } from './store/counter.actions';
import { selectAllItems } from './store/item.selectors';
import { selectCounter } from './counter.selectors';
import { Observable } from 'rxjs';
import { CounterComponent } from './components/counter/counter.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OtpComponent } from './components/otp/otp.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'ReduxProj';
  
  constructor(public dialog: MatDialog) {}

  openOtpDialog(): void {
    const dialogRef = this.dialog.open(OtpComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'verified') {
        console.log('OTP verified successfully');
      } else {
        console.log('OTP verification failed');
      }
    });
  }
}