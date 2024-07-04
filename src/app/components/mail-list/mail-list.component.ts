import { Component, OnInit } from '@angular/core';
import { MailService } from '../../mail.service';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrl: './mail-list.component.css'
})
export class MailListComponent implements OnInit {
  mails: any[] = [];
  selectedMail: any = null;

  constructor(private mailService: MailService) { }

  ngOnInit(): void {
    this.loadMails();
  }

  loadMails(): void {
    this.mailService.getSentMails().subscribe((data: any[]) => {
      this.mails = data;
    });
  }

  selectMail(mail: any): void {
    this.selectedMail = mail;
  }
}