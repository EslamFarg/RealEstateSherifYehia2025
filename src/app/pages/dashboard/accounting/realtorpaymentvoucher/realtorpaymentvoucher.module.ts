import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealtorpaymentvoucherRoutingModule } from './realtorpaymentvoucher-routing.module';
import { RealtorpaymentvoucherComponent } from './realtorpaymentvoucher.component';


@NgModule({
  declarations: [
    RealtorpaymentvoucherComponent
  ],
  imports: [
    CommonModule,
    RealtorpaymentvoucherRoutingModule
  ]
})
export class RealtorpaymentvoucherModule { }
