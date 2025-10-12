import { TestBed } from '@angular/core/testing';

import { ProfilesettingsService } from './profilesettings.service';

describe('ProfilesettingsService', () => {
  let service: ProfilesettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
