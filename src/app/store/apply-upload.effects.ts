
import * as ApplyUploadActions from '../store/apply-upload.actions'
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Injectable()
export class ApplyUploadEffects {

  constructor(private actions$: Actions, private sanitizer: DomSanitizer,private http: HttpClient,private authservice : AuthService) {}

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyUploadActions.uploadFile),
      tap(action => console.log('Upload file action dispatched:', action)),
      switchMap(action => {
        const reader = new FileReader();
        const fileReader$ = new Observable<string>((observer) => {
          reader.onload = () => {
            console.log('File read successfully:', reader.result);
            observer.next(reader.result as string);
            observer.complete();
          };
          reader.onerror = (error) => {
            console.error('Error reading file:', error);
            observer.error(error);
          };
          reader.readAsDataURL(action.file);
        });

        return fileReader$.pipe(
          tap(base64File => {
            console.log('Saving file to localStorage.');
            localStorage.setItem('uploadedFile', base64File);
            localStorage.setItem('uploadedFileName', action.file.name);
            localStorage.setItem('uploadedFileType', action.file.type);
          }),
          map(base64File => {
            const fileUrl = URL.createObjectURL(action.file);
            console.log('File upload success, file URL:', fileUrl);
            return ApplyUploadActions.uploadFileSuccess({ fileUrl });
          }),
          catchError(error => {
            console.error('File upload failure:', error);
            return of(ApplyUploadActions.uploadFileFailure({ error }));
          })
        );
      })
    )
  );

  loadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyUploadActions.loadFile),
      tap(() => console.log('Load file action dispatched')),
      switchMap(() => {
        const base64File = localStorage.getItem('uploadedFile');
        const fileName = localStorage.getItem('uploadedFileName');
        const fileType = localStorage.getItem('uploadedFileType');

        if (base64File && fileName && fileType) {
          const byteString = atob(base64File.split(',')[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const int8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([arrayBuffer], { type: fileType });
          const file = new File([blob], fileName, { type: fileType });
          const fileUrl = URL.createObjectURL(file);
          console.log('File loaded successfully:', file);

          return of(ApplyUploadActions.loadFileSuccess({ file, fileUrl }));
        } else {
          console.error('No file found in localStorage.');
          return of(ApplyUploadActions.loadFileFailure({ error: 'No file found in localStorage' }));
        }
      }),
      catchError(error => {
        console.error('Error loading file:', error);
        return of(ApplyUploadActions.loadFileFailure({ error }));
      })
    )
  );

  clearFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyUploadActions.clearFile),
      tap(() => {
        console.log('Clearing file from localStorage.');
        localStorage.removeItem('uploadedFile');
        localStorage.removeItem('uploadedFileName');
        localStorage.removeItem('uploadedFileType');
      })
    ),
    { dispatch: false }
  );


  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplyUploadActions.submitForm),
      switchMap((): Observable<Action> => {
        const base64File = localStorage.getItem('uploadedFile');
        const fileName = localStorage.getItem('uploadedFileName');
        const fileType = localStorage.getItem('uploadedFileType');
        const savedFormData = localStorage.getItem('registrationFormDatanew');
        const userid = this.authservice.getUserId();
     
        const urlnew = `http://localhost:3000/applynow`;
        if (base64File && fileName && fileType && savedFormData) {
          const formData = {
            userid : userid,
            file: base64File,
            fileName: fileName,
            fileType: fileType,
            formData: JSON.parse(savedFormData)
          };

          return this.http.post<{ success: boolean }>(urlnew, formData).pipe(
            map(() => ApplyUploadActions.submitFormSuccess()),
            catchError(error => of(ApplyUploadActions.submitFormFailure({ error })))
          );
        } else {
          return of(ApplyUploadActions.submitFormFailure({ error: 'Incomplete data in local storage' }));
        }
      })
    )
  );
  
}
