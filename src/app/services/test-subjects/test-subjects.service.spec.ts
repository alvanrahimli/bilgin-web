import { TestBed } from '@angular/core/testing';

import { TestSubjectsService } from './test-subjects.service';

describe('TestSubjectsService', () => {
  let service: TestSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
