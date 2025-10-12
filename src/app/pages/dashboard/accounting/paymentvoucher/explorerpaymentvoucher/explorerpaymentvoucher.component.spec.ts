import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerpaymentvoucherComponent } from './explorerpaymentvoucher.component';

describe('ExplorerpaymentvoucherComponent', () => {
  let component: ExplorerpaymentvoucherComponent;
  let fixture: ComponentFixture<ExplorerpaymentvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorerpaymentvoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerpaymentvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
