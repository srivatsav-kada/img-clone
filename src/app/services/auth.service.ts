import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';
  private username: string | null = null;
  private userid : string | null = null;
  dashboardVal : any
  private titleSource = new BehaviorSubject<string>('Dashboard');

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ success: boolean, username?: string, error?: string }> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username);
        if (user && bcrypt.compareSync(password, user.password)) {
          this.setUsername(user.username);
          console.log('**')
          this.setUserId(user.id)
          console.log(user.id)
          return { success: true, username: user.username };
        } else {
          return { success: false, error: 'Invalid username or password' };
        }
      }),
      catchError(error => {
        return of({ success: false, error: error.message });
      })
    );
  }

  setUsername(username: string) {
    this.username = username;
  }


  getUsername(): Observable<string> {
    return of(this.username as string);
  }

  setUserId(userid : string){
    this.userid= userid
  }

  getUserId() {
  return this.userid
  }

  currentTitle = this.titleSource.asObservable();

  changeTitle(title: string) {
    this.titleSource.next(title);
  }
}
