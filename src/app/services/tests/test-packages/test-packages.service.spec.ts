import { TestBed } from '@angular/core/testing';

import { TestPackagesService } from './test-packages.service';

describe('TestPackagesService', () => {
  let service: TestPackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestPackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
