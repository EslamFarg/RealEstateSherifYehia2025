import { TestBed } from '@angular/core/testing';

import { ClassificationapartmentService } from './classificationapartment.service';

describe('ClassificationapartmentService', () => {
  let service: ClassificationapartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificationapartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
