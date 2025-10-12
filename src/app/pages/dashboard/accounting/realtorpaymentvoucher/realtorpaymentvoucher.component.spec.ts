import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtorpaymentvoucherComponent } from './realtorpaymentvoucher.component';

describe('RealtorpaymentvoucherComponent', () => {
  let component: RealtorpaymentvoucherComponent;
  let fixture: ComponentFixture<RealtorpaymentvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealtorpaymentvoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealtorpaymentvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
