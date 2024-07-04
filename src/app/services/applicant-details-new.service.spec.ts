import { TestBed } from '@angular/core/testing';

import { ApplicantDetailsNewService } from './applicant-details-new.service';

describe('ApplicantDetailsNewService', () => {
  let service: ApplicantDetailsNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicantDetailsNewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
