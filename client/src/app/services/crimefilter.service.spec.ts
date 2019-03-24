import { TestBed } from '@angular/core/testing';

import { CrimefilterService } from './crimefilter.service';

describe('CrimefilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrimefilterService = TestBed.get(CrimefilterService);
    expect(service).toBeTruthy();
  });
});
