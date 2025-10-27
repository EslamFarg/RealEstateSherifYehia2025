import { TestBed } from '@angular/core/testing';

import { MessagesettingsService } from './messagesettings.service';

describe('MessagesettingsService', () => {
  let service: MessagesettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
