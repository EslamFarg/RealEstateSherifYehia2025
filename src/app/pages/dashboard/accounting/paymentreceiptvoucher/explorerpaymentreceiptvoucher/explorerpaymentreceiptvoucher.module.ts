import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerpaymentreceiptvoucherRoutingModule } from './explorerpaymentreceiptvoucher-routing.module';
import { ExplorerpaymentreceiptvoucherComponent } from './explorerpaymentreceiptvoucher.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from "../../../../../shared/ui/search-data/search-data.component";
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ExplorerpaymentreceiptvoucherComponent
  ],
  imports: [
    CommonModule,
    ExplorerpaymentreceiptvoucherRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    PaginationComponent
]
})
export class ExplorerpaymentreceiptvoucherModule { }
