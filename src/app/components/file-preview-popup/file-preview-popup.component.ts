import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-preview-popup',
  templateUrl: './file-preview-popup.component.html',
  styleUrl: './file-preview-popup.component.css'
})
export class FilePreviewPopupComponent {

  filePreviewUrl: string | null;

  constructor(
    public dialogRef: MatDialogRef<FilePreviewPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filePreviewUrl: string }
  ) {
    console.log('FilePreviewDialogComponent: Initialized with data:', data);
    this.filePreviewUrl = data.filePreviewUrl;
    console.log('FilePreviewDialogComponent: filePreviewUrl set to:', this.filePreviewUrl);
  }

  closeDialog(): void {
    console.log('FilePreviewDialogComponent: Closing dialog.');
    this.dialogRef.close();
  }

  isImageFile(url: string | null): boolean {
    const isImage = url != null && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.gif') || url.endsWith('.png'));
    console.log('FilePreviewDialogComponent: Checking if URL is an image:', url, 'Result:', isImage);
    return isImage;
  }
}