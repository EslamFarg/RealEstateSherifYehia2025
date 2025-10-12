import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddrealtorpaymentvoucherRoutingModule } from './addrealtorpaymentvoucher-routing.module';
import { AddrealtorpaymentvoucherComponent } from './addrealtorpaymentvoucher.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../../shared/ui/searchinforms/searchinforms.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AddrealtorpaymentvoucherComponent
  ],
  imports: [
    CommonModule,
    AddrealtorpaymentvoucherRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    NgSelectModule
  ]
})
export class AddrealtorpaymentvoucherModule { }
