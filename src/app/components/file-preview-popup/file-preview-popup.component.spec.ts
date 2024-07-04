import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePreviewPopupComponent } from './file-preview-popup.component';

describe('FilePreviewPopupComponent', () => {
  let component: FilePreviewPopupComponent;
  let fixture: ComponentFixture<FilePreviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilePreviewPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilePreviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
