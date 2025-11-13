import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatgrouppermissionsComponent } from './concatgrouppermissions.component';

describe('ConcatgrouppermissionsComponent', () => {
  let component: ConcatgrouppermissionsComponent;
  let fixture: ComponentFixture<ConcatgrouppermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConcatgrouppermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcatgrouppermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
