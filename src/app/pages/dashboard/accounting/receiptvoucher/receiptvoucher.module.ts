import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptvoucherRoutingModule } from './receiptvoucher-routing.module';
import { ReceiptvoucherComponent } from './receiptvoucher.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormerrorMsgComponent } from '../../../../shared/ui/formerror-msg/formerror-msg.component';
import { DirectivesModule } from "../../../../shared/directives/directives.module";
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    ReceiptvoucherComponent
  ],
  imports: [
    CommonModule,
    ReceiptvoucherRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    PaginationComponent,
    ReactiveFormsModule,
    FormerrorMsgComponent,
    DirectivesModule,
    EmptytableComponent,
    ConfirmDeleteComponent
]
})
export class ReceiptvoucherModule { }
