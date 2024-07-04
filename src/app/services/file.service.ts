import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplyUploadState } from '../store/apply-upload.reducer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:3000/applynow'; // Update with the actual URL

  constructor(private http: HttpClient) {}

  getFileData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getMonthsUpToCurrent(): string[] {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0-indexed month

    // Slice the array up to the current month index + 1 (to include the current month)
    return months.slice(0, currentMonthIndex + 1);
  }

  getLastYearMonths(): string[] {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0-indexed month

    // Slice the array up to the current month index + 1 (to include the current month)
    return months;
  }
}