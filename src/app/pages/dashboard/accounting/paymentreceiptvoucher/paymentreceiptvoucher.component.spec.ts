import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreceiptvoucherComponent } from './paymentreceiptvoucher.component';

describe('PaymentreceiptvoucherComponent', () => {
  let component: PaymentreceiptvoucherComponent;
  let fixture: ComponentFixture<PaymentreceiptvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentreceiptvoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentreceiptvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
