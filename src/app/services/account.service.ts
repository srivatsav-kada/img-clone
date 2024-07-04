// account.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Account } from '../store/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAccountSummary(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/beneficiary`);
  }

  getAccountByUsername(username: string): Observable<Account | null> {
    const url = `${this.apiUrl}/beneficiary?username=${username}`;
    return this.http.get<Account[]>(url).pipe(
      map((accounts) => {
        const account = accounts[0] || null; // Assuming the response is an array
        console.log(`Account found for username "${username}":`, account); // Log the found account
        return account;
      })
    );
  }

  updateAccountBalance(id: number, updatedAccount: Account): Observable<Account> {
    const url = `${this.apiUrl}/beneficiary/${id}`;
    return this.http.put<Account>(url, updatedAccount);
  }
}
