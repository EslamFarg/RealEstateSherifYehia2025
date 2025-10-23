import { TestBed } from '@angular/core/testing';

import { EditProfileImgService } from './edit-profile-img.service';

describe('EditProfileImgService', () => {
  let service: EditProfileImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProfileImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
