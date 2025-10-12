import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerpaymentreceiptvoucherComponent } from './explorerpaymentreceiptvoucher.component';

describe('ExplorerpaymentreceiptvoucherComponent', () => {
  let component: ExplorerpaymentreceiptvoucherComponent;
  let fixture: ComponentFixture<ExplorerpaymentreceiptvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorerpaymentreceiptvoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerpaymentreceiptvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
