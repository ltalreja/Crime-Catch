import {TestBed} from '@angular/core/testing';

import {PoliceGaurdService} from './police-gaurd.service';

describe('PoliceGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoliceGaurdService = TestBed.get(PoliceGaurdService);
    expect(service).toBeTruthy();
  });
});
