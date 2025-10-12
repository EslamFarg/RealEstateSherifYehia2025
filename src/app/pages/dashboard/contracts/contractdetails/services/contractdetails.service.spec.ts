import { TestBed } from '@angular/core/testing';

import { ContractdetailsService } from './contractdetails.service';

describe('ContractdetailsService', () => {
  let service: ContractdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
