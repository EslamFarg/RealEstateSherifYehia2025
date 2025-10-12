import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpaymentreceiptvoucherRoutingModule } from './addpaymentreceiptvoucher-routing.module';
import { AddpaymentreceiptvoucherComponent } from './addpaymentreceiptvoucher.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../../shared/ui/searchinforms/searchinforms.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AddpaymentreceiptvoucherComponent
  ],
  imports: [
    CommonModule,
    AddpaymentreceiptvoucherRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    NgSelectModule
  ]
})
export class AddpaymentreceiptvoucherModule { }
