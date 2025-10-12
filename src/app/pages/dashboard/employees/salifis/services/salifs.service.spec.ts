import { TestBed } from '@angular/core/testing';

import { SalifsService } from './salifs.service';

describe('SalifsService', () => {
  let service: SalifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
