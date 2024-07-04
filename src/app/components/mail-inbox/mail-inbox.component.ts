import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mail-inbox',
  templateUrl: './mail-inbox.component.html',
  styleUrl: './mail-inbox.component.css'
})
export class MailInboxComponent implements OnInit{
constructor(private authcheckdashboard: AuthService){}
ngOnInit(): void {
  this.authcheckdashboard.changeTitle('Secure Mail');
}
}
