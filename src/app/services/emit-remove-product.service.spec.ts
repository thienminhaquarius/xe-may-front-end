import { TestBed } from '@angular/core/testing';

import { EmitRemoveProductService } from './emit-remove-product.service';

describe('EmitRemoveProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmitRemoveProductService = TestBed.get(EmitRemoveProductService);
    expect(service).toBeTruthy();
  });
});
