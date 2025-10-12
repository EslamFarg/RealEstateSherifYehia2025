import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpaymentvoucherComponent } from './addpaymentvoucher.component';

describe('AddpaymentvoucherComponent', () => {
  let component: AddpaymentvoucherComponent;
  let fixture: ComponentFixture<AddpaymentvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddpaymentvoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpaymentvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
