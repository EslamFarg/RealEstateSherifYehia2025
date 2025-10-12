import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerpaymentvoucherRoutingModule } from './explorerpaymentvoucher-routing.module';
import { ExplorerpaymentvoucherComponent } from './explorerpaymentvoucher.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from '../../../../../shared/ui/search-data/search-data.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ExplorerpaymentvoucherComponent
  ],
  imports: [
    CommonModule,
    ExplorerpaymentvoucherRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    PaginationComponent
  ]
})
export class ExplorerpaymentvoucherModule { }
