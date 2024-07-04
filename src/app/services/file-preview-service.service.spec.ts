import { TestBed } from '@angular/core/testing';

import { FilePreviewServiceService } from './file-preview-service.service';

describe('FilePreviewServiceService', () => {
  let service: FilePreviewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilePreviewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
