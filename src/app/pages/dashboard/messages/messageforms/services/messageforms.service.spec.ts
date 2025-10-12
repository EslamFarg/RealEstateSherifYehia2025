import { TestBed } from '@angular/core/testing';

import { MessageformsService } from './messageforms.service';

describe('MessageformsService', () => {
  let service: MessageformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageformsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
