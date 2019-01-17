import {TestBed} from '@angular/core/testing';

import {AuthSecureService} from './auth-secure.service';

describe('AuthSecureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthSecureService = TestBed.get(AuthSecureService);
    expect(service).toBeTruthy();
  });
});
