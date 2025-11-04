import { TestBed } from '@angular/core/testing';

import { OwnerpaymentvoucherService } from './ownerpaymentvoucher.service';

describe('OwnerpaymentvoucherService', () => {
  let service: OwnerpaymentvoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerpaymentvoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
