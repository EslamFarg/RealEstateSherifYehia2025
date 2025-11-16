import { TestBed } from '@angular/core/testing';

import { EditorialCreditsService } from './editorial-credits.service';

describe('EditorialCreditsService', () => {
  let service: EditorialCreditsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorialCreditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
