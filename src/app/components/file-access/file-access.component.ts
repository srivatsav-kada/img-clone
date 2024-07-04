import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileService } from '../../services/file.service';
import { ApplyUploadState } from '../../store/apply-upload.reducer';
import { MatDialog } from '@angular/material/dialog';
import { FilePreviewPopupComponent } from '../file-preview-popup/file-preview-popup.component';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-file-access',
  templateUrl: './file-access.component.html',
  styleUrl: './file-access.component.css'
})
export class FileAccessComponent implements OnInit{

  fileData: any;
  fileUrl: string | null = null;
  months: string[] = [];
  lstYearmonths: string[] = [];


  constructor(private fileDataService: FileService, private dialog: MatDialog,private authcheckdashboard:AuthService) {}

  ngOnInit(): void {
    this.loadFileData();
    this.months = this.fileDataService.getMonthsUpToCurrent();
    this.lstYearmonths = this.fileDataService.getLastYearMonths();
    this.authcheckdashboard.changeTitle('Monthly Documents')
  }

  loadFileData(): void {
    this.fileDataService.getFileData().subscribe(data => {
      if (data && data.length > 0) {
        this.fileData = data[0];
        this.createFileUrl(this.fileData.file, this.fileData.fileType);
      }
    }, error => {
      console.error('Error fetching file data:', error);
    });
  }

  createFileUrl(base64File: string, fileType: string): void {
    const byteString = atob(base64File.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: fileType });
    this.fileUrl = URL.createObjectURL(blob);


  }

  handleClick(month: string): void {
    if (month === 'April') {
      this.openFile();
    } else {
      this.FailedLoadingFile('File Not Found for the particular Month');
    }
  }


  openFile(): void {
    
    if (this.fileUrl) {
      const dialogRef = this.dialog.open(FilePreviewPopupComponent, {
        width: '800px',
        data: { filePreviewUrl: this.fileUrl }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('File preview dialog closed.');
      });
    } else {
      console.log('No file uploaded for preview.');
      alert('No file uploaded for preview.');
    }
  }

  FailedLoadingFile(errorMessage: string): void {
    this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: { errorMessage }
    });
  }
}