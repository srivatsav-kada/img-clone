import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppState } from '../../models/app-state.model';
import { Store } from '@ngrx/store';
// import { BlockedAccountActions} from '../../store/blocked-account.actions'
import * as BlockedAccountActions from '../../store/blocked-account.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blocked-account',
  templateUrl: './blocked-account.component.html',
  styleUrl: './blocked-account.component.css'
})
export class BlockedAccountComponent  implements OnInit{
  //   constructor (private router : Router){}
  //   clicked(){
  //     this.router.navigate(['home/applyNow'])
  //   }

  //   securemailbutton(){
  //     this.router.navigate(['home/SecureMail'])
  //   }

  // }

  // constructor(private store: Store<AppState>, private router: Router) { }
  
  constructor(private store: Store, private router: Router,private authcheckdashboard : AuthService) { }
  ngOnInit(): void {
    this.authcheckdashboard.changeTitle('DashBoard');
  }

  clicked() {
    // Dispatch action to navigate to apply now
    console.log('one')
    this.store.dispatch(BlockedAccountActions.navigateToApplyNow());
  }

  securemailbutton() {
    // Dispatch action to navigate to secure mail
    this.store.dispatch(BlockedAccountActions.navigateToSecureMail());
  }

}