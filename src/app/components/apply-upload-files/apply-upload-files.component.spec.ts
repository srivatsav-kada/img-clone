import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyUploadFilesComponent } from './apply-upload-files.component';

describe('ApplyUploadFilesComponent', () => {
  let component: ApplyUploadFilesComponent;
  let fixture: ComponentFixture<ApplyUploadFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyUploadFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyUploadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
