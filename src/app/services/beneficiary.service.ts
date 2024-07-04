import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '../components/view-beneficiary/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  private apiUrl = 'http://localhost:3000/beneficiary';

  constructor(private http: HttpClient) {}

  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(this.apiUrl);
  }
}