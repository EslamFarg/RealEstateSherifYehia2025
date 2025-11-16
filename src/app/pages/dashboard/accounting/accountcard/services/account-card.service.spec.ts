import { TestBed } from '@angular/core/testing';

import { AccountCardService } from './account-card.service';

describe('AccountCardService', () => {
  let service: AccountCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
