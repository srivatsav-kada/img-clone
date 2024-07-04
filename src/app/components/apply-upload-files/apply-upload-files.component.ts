import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplyUploadState } from '../../store/apply-upload.reducer';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import * as ApplyUploadActions from '../../store/apply-upload.actions'
import { FilePreviewPopupComponent } from '../file-preview-popup/file-preview-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-apply-upload-files',
  templateUrl: './apply-upload-files.component.html',
  styleUrl: './apply-upload-files.component.css'
})
export class ApplyUploadFilesComponent implements OnInit {
 
  fileToUpload: File | null = null;
  filePreviewUrl$: Observable<string | null>;
  filePreviewUrl: string | null = null;

 
  constructor(private store: Store<{ applyUpload: ApplyUploadState }>,private dialog: MatDialog,private router: Router,private authcheckdashboard: AuthService) {
    this.filePreviewUrl$ = this.store.select(state => state.applyUpload.fileUrl);
  }

  ngOnInit(): void {
    console.log('Initializing component and loading file from store.');
    this.store.dispatch(ApplyUploadActions.loadFile());


    this.filePreviewUrl$.subscribe(filePreviewUrl => {
      this.filePreviewUrl = filePreviewUrl;
      console.log('File preview URL updated:', filePreviewUrl);
    });
    this.authcheckdashboard.changeTitle('Upload Documents');
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files[0];
      console.log('File selected:', this.fileToUpload);
      this.store.dispatch(ApplyUploadActions.uploadFile({ file: this.fileToUpload }));
    } else {
      console.log('No file selected.');
    }
  }

  clearFile() {
    console.log('Clearing file from component and store.');
    this.fileToUpload = null;
    this.filePreviewUrl = null;
    this.store.dispatch(ApplyUploadActions.clearFile());
  }


  previewFile() {
    if (this.filePreviewUrl) {
      const dialogRef = this.dialog.open(FilePreviewPopupComponent, {
        width: '800px',
        data: { filePreviewUrl: this.filePreviewUrl }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('File preview dialog closed.');
      });
    } else {
      console.log('No file uploaded for preview.');
      alert('No file uploaded for preview.');
    }
  }
  submitFormdd() {
    console.log('Submitting form with data from local storage.');
    this.store.dispatch(ApplyUploadActions.submitForm());
    this.router.navigate(['/home/homePage'])
  }
}
