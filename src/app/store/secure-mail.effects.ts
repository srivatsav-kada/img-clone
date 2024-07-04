import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import * as SecureMailActions from './secure-mail.actions';

@Injectable()
export class SecureMailEffects {

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SecureMailActions.setView),
      map(action => action.view),
      tap(view => {
        switch(view) {
          case 'compose':
            this.router.navigate(['/home/SecureMail/compose']);
            break;
          case 'inbox':
            this.router.navigate(['/home/SecureMail/inbox']);
            break;
          case 'sent':
            this.router.navigate(['/home/SecureMail/sent']);
            break;
        }
      })
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
