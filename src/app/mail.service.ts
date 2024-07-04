import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private inboxUrl = 'http://localhost:3000/inbox';
  private sentUrl = 'http://localhost:3000/sent';

  constructor(private http: HttpClient) { }

  getInboxMails(): Observable<any[]> {
    return this.http.get<any[]>(this.inboxUrl);
  }

  getSentMails(): Observable<any[]> {
    return this.http.get<any[]>(this.sentUrl);
  }

  sendMail(mail: any): Observable<any> {
    return this.http.post<any>(this.sentUrl, mail);
  }


  getMail(id: any): Observable<any> {
    const inboxMail$ = this.http.get<any[]>(`${this.inboxUrl}?id=${id}`);
    const sentMail$ = this.http.get<any[]>(`${this.sentUrl}?id=${id}`);
    
    return new Observable(observer => {
      inboxMail$.subscribe(inboxMail => {
        if (inboxMail.length > 0) {
          observer.next(inboxMail[0]);
          observer.complete();
        } else {
          sentMail$.subscribe(sentMail => {
            if (sentMail.length > 0) {
              observer.next(sentMail[0]);
            } else {
              observer.error('Mail not found');
            }
            observer.complete();
          });
        }
      });
    });

  }
}
