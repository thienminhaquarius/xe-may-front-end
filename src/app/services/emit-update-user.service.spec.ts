import { TestBed } from '@angular/core/testing';

import { EmitUpdateUserService } from './emit-update-user.service';

describe('EmitUpdateUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmitUpdateUserService = TestBed.get(EmitUpdateUserService);
    expect(service).toBeTruthy();
  });
});
