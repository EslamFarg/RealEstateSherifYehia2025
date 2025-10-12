import { TestBed } from '@angular/core/testing';

import { TypemaintenanceService } from './typemaintenance.service';

describe('TypemaintenanceService', () => {
  let service: TypemaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypemaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
