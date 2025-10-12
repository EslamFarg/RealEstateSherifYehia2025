import { TestBed } from '@angular/core/testing';

import { AddcontractService } from './addcontract.service';

describe('AddcontractService', () => {
  let service: AddcontractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcontractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
