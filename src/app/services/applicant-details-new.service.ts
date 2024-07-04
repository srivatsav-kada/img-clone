// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Applicant } from '../store/applicant-details.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApplicantDetailsNewService {

//   constructor(private http: HttpClient) {}
//   private apiUrl = 'http://localhost:3000/applicantDetails';
//   // private formDataSubject = new BehaviorSubject<Applicant | null>(null);
//   private formDataSubject: BehaviorSubject<Applicant | null> = new BehaviorSubject<Applicant | null>(null);
//   private taxFormDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

//   formData$ = this.formDataSubject.asObservable();
//   private formData: any; // Assuming this is for applicant form data
//   // private taxFormData: any; // For tax form data
 

//   setFormData(data: Applicant) {
//     console.log('FormDataService setFormData:', data);
//     this.formDataSubject.next(data);
//   }

//   getFormData() {
//     const formData = this.formDataSubject.getValue();
//     console.log('FormDataService getFormData:', formData);
//     return formData;
//   }

  


  
//   getApplicants(): Observable<Applicant[]> {
//     // console.log('Fetching all applicants...');
//     return this.http.get<Applicant[]>(this.apiUrl);
//   }

//   getApplicantByUsername(username: string): Observable<Applicant[]> {
//     const url = `${this.apiUrl}?username=${username}`;
//     // console.log(`Fetching applicant with username: ${username} using URL: ${url}`);
//     return this.http.get<Applicant[]>(url);
//   }


  
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Applicant } from '../store/applicant-details.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicantDetailsNewService {
  private apiUrl = 'http://localhost:3000/applicantDetails';
  private apiUrlsec = 'http://localhost:3000/activateaccountform';
  private formDataSubject: BehaviorSubject<Applicant | null> = new BehaviorSubject<Applicant | null>(null);
  private taxFormDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private passwordFormDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
  private paymentDetails: any;

  formData$ = this.formDataSubject.asObservable();
  taxFormData$ = this.taxFormDataSubject.asObservable();
  passwordFormData$ = this.passwordFormDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  setFormData(data: Applicant) {
    this.formDataSubject.next(data);
  }

  getFormData() {
    return this.formDataSubject.getValue();
  }

  setTaxFormData(data: any) {
    this.taxFormDataSubject.next(data);
  }

  getTaxFormData() {
    return this.taxFormDataSubject.getValue();
  }

  setPasswordFormData(data: any) {
    this.passwordFormDataSubject.next(data);
  }

  getPasswordFormData() {
    return this.passwordFormDataSubject.getValue();
  }

  getApplicants(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.apiUrl);
  }

  getApplicantByUsername(username: string): Observable<Applicant[]> {
    const url = `${this.apiUrl}?username=${username}`;
    return this.http.get<Applicant[]>(url);
  }

  submitCombinedData(data: any): Observable<any> {
    return this.http.post(this.apiUrlsec, data);
  }
  setPaymentDetails(details: any): void {
    this.paymentDetails = details;
    console.log(details)
  }

  getPaymentDetails(): any {
    console.log('askk')
    console.log(this.paymentDetails)
    return this.paymentDetails;
  }
}
