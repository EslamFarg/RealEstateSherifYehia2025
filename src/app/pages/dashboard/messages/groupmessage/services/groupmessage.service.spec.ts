import { TestBed } from '@angular/core/testing';

import { GroupmessageService } from './groupmessage.service';

describe('GroupmessageService', () => {
  let service: GroupmessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupmessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
