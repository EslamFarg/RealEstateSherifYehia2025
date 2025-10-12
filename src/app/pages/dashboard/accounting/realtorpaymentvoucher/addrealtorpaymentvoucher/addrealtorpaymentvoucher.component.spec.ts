import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrealtorpaymentvoucherComponent } from './addrealtorpaymentvoucher.component';

describe('AddrealtorpaymentvoucherComponent', () => {
  let component: AddrealtorpaymentvoucherComponent;
  let fixture: ComponentFixture<AddrealtorpaymentvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddrealtorpaymentvoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddrealtorpaymentvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
