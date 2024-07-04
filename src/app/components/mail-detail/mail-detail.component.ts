import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailService } from '../../mail.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrl: './mail-detail.component.css'
})
export class MailDetailComponent implements OnInit {
  mail: any;

  constructor(private route: ActivatedRoute, private mailService: MailService,private authcheckdashboard:AuthService) { }

  ngOnInit(): void {
    this.authcheckdashboard.changeTitle('Secure Mail');
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id)
    console.log('*//')
    this.mailService.getMail(id).subscribe(mail => this.mail = mail);
  }
}