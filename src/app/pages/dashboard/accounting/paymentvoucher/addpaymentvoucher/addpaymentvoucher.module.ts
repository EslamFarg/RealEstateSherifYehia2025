import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpaymentvoucherRoutingModule } from './addpaymentvoucher-routing.module';
import { AddpaymentvoucherComponent } from './addpaymentvoucher.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SearchinformsComponent } from '../../../../../shared/ui/searchinforms/searchinforms.component';
// import { NgSelectComponent } from "../../../../../../../node_modules/@ng-select/ng-select/lib/ng-select.component";


@NgModule({
  declarations: [
    AddpaymentvoucherComponent
  ],
  imports: [
    CommonModule,
    AddpaymentvoucherRoutingModule,
    PageHeadingComponent,
    // NgSelectComponent
    NgSelectModule,
    SearchinformsComponent
]
})
export class AddpaymentvoucherModule { }
