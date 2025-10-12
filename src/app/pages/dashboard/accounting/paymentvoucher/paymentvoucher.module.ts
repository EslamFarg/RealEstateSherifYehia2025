import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentvoucherRoutingModule } from './paymentvoucher-routing.module';
import { PaymentvoucherComponent } from './paymentvoucher.component';


@NgModule({
  declarations: [
    PaymentvoucherComponent
  ],
  imports: [
    CommonModule,
    PaymentvoucherRoutingModule
  ]
})
export class PaymentvoucherModule { }
