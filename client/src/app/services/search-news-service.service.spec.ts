import { TestBed } from '@angular/core/testing';

import { SearchNewsServiceService } from './search-news-service.service';

describe('SearchNewsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchNewsServiceService = TestBed.get(SearchNewsServiceService);
    expect(service).toBeTruthy();
  });
});
