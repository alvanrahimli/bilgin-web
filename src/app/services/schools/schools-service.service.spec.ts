import { TestBed } from '@angular/core/testing';

import { SchoolsService } from './schools-service.service';

describe('SchoolsServiceService', () => {
  let service: SchoolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
