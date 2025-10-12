import { TestBed } from '@angular/core/testing';

import { ActivitytrackingService } from './activitytracking.service';

describe('ActivitytrackingService', () => {
  let service: ActivitytrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitytrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
