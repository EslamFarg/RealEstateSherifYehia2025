import { TestBed } from '@angular/core/testing';

import { MaindataService } from './maindata.service';

describe('MaindataService', () => {
  let service: MaindataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaindataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
