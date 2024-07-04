import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../services/auth.service';

import { login, loginSuccess, loginFailure } from './auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogboxComponent } from '../components/dialogbox/dialogbox.component';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog

  ) {}


login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(login),
    tap(action => console.log('Login action received:', action)),
    mergeMap(action =>
      this.authService.login(action.username, action.password).pipe(
        map(result => {
          if (result.success) {
            console.log('Login successful:', result.username);
            return loginSuccess({ username: result.username! });
          } else {
            console.log('Login failed:', result.error);
            return loginFailure({ error: result.error! });
          }
        }),
        catchError(error => {
          console.error('Error during login:', error);
          return of(loginFailure({ error: error.message }));
        })
      )
    )
  )
);

loginSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(action => {
        console.log('Login success action received:', action);
        console.log('Navigating to /homePage/dummy');
        this.router.navigate(['/home/homePage']);
      })
    ),
  { dispatch: false }
);

loginFailure$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(loginFailure),
      tap(action => {
        const dialogRef = this.dialog.open(DialogboxComponent, {
          data: { errorMessage: action.error } // Pass error message to modal
        });
        // this.openRegistrationFailedDialog('Please fill out all fields correctly.');
        console.log('Login failure action received:', action);
      })
    ),
  { dispatch: false }
);
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) => {
        const hashedPassword = bcrypt.hashSync(action.password, 10);
        const formData = {
          username: action.username,
          email: action.email,
          country: action.country,
          password: hashedPassword,
        };

        return this.http.post<any>('http://localhost:3000/users', formData).pipe(
          map(() => AuthActions.registerSuccess()),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: error.message }))
          )
        );
      })
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => this.router.navigate(['/forms/login']))
      ),
    { dispatch: false }
  );


  fetchUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchUsername),
      mergeMap(() =>
        this.authService.getUsername().pipe(
          map(username => AuthActions.fetchUsernameSuccess({ username })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );



}

