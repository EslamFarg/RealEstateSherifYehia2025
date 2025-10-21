import { TestBed } from '@angular/core/testing';

import { EditBehaviorServiceService } from './edit-behavior-service.service';

describe('EditBehaviorServiceService', () => {
  let service: EditBehaviorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditBehaviorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
