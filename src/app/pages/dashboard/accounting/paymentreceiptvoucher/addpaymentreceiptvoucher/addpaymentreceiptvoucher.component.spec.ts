import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaymentreceiptvoucherComponent } from './addpaymentreceiptvoucher.component';

describe('AddpaymentreceiptvoucherComponent', () => {
  let component: AddpaymentreceiptvoucherComponent;
  let fixture: ComponentFixture<AddpaymentreceiptvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddpaymentreceiptvoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpaymentreceiptvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
