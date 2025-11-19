import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpaymentreceiptvoucherRoutingModule } from './addpaymentreceiptvoucher-routing.module';
import { AddpaymentreceiptvoucherComponent } from './addpaymentreceiptvoucher.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../../shared/ui/searchinforms/searchinforms.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormerrorMsgComponent } from '../../../../../shared/ui/formerror-msg/formerror-msg.component';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { PopupSearchComponent } from '../../../../../shared/ui/popup-search/popup-search.component';
import { PopupSearchTenantComponent } from '../../../../../shared/ui/popup-search-tenant/popup-search.component';


@NgModule({
  declarations: [
    AddpaymentreceiptvoucherComponent
  ],
  imports: [
    CommonModule,
    AddpaymentreceiptvoucherRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FormerrorMsgComponent,
    ConfirmDeleteComponent,
    // PopupSearchTenaComponent
    PopupSearchTenantComponent
]
})
export class AddpaymentreceiptvoucherModule { }
