import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerrealtorpaymentvoucherComponent } from './explorerrealtorpaymentvoucher.component';

describe('ExplorerrealtorpaymentvoucherComponent', () => {
  let component: ExplorerrealtorpaymentvoucherComponent;
  let fixture: ComponentFixture<ExplorerrealtorpaymentvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExplorerrealtorpaymentvoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExplorerrealtorpaymentvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
