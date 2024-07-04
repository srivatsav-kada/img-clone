import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailService } from '../../mail.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-compose-mail',
  templateUrl: './compose-mail.component.html',
  styleUrl: './compose-mail.component.css'
})
export class ComposeMailComponent implements OnInit {
  mailForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mailService: MailService,
    private authcheckdashboard : AuthService
  ) { }

  ngOnInit(): void {
    this.mailForm = this.fb.group({
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
    this.authcheckdashboard.changeTitle('Secure Mail');
  }

  sendMail(): void {
    if (this.mailForm.valid) {
      const newMail = {
        subject: this.mailForm.value.subject,
        body: this.mailForm.value.body,
        timestamp: new Date()
      };
      console.log('send succesful')
      this.mailService.sendMail(newMail).subscribe(() => {
        this.router.navigate(['/home/SecureMail/sent']);
      });
    }else{
      console.log('send unsuccessful')
    }
  }

  cancel(): void {
    this.router.navigate(['/home/SecureMail/inbox']);
    console.log
  }
}