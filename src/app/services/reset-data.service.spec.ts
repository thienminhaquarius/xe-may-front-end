import { TestBed } from '@angular/core/testing';

import { ResetDataService } from './reset-data.service';

describe('ResetDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetDataService = TestBed.get(ResetDataService);
    expect(service).toBeTruthy();
  });
});
