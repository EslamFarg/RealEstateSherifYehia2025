import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentreceiptvoucherRoutingModule } from './paymentreceiptvoucher-routing.module';
import { PaymentreceiptvoucherComponent } from './paymentreceiptvoucher.component';


@NgModule({
  declarations: [
    PaymentreceiptvoucherComponent
  ],
  imports: [
    CommonModule,
    PaymentreceiptvoucherRoutingModule
  ]
})
export class PaymentreceiptvoucherModule { }
