import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptvoucherRoutingModule } from './receiptvoucher-routing.module';
import { ReceiptvoucherComponent } from './receiptvoucher.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ReceiptvoucherComponent
  ],
  imports: [
    CommonModule,
    ReceiptvoucherRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    PaginationComponent
  ]
})
export class ReceiptvoucherModule { }
