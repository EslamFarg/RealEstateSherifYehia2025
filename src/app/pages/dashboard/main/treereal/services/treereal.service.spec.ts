import { TestBed } from '@angular/core/testing';

import { TreerealService } from './treereal.service';

describe('TreerealService', () => {
  let service: TreerealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreerealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
