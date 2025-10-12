import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerrealtorpaymentvoucherRoutingModule } from './explorerrealtorpaymentvoucher-routing.module';
import { ExplorerrealtorpaymentvoucherComponent } from './explorerrealtorpaymentvoucher.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from '../../../../../shared/ui/search-data/search-data.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ExplorerrealtorpaymentvoucherComponent
  ],
  imports: [
    CommonModule,
    ExplorerrealtorpaymentvoucherRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    PaginationComponent
  ]
})
export class ExplorerrealtorpaymentvoucherModule { }
