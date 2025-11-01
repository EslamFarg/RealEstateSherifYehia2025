import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentvouchernormalRoutingModule } from './paymentvouchernormal-routing.module';
import { PaymentvouchernormalComponent } from './paymentvouchernormal.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';
import { FormerrorMsgComponent } from '../../../../shared/ui/formerror-msg/formerror-msg.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    PaymentvouchernormalComponent
  ],
  imports: [
    CommonModule,
    PaymentvouchernormalRoutingModule,
    PageHeadingComponent,
    PaginationComponent,
    NgSelectModule,
    ReactiveFormsModule,
    EmptytableComponent,
    FormerrorMsgComponent,
    ConfirmDeleteComponent
  ]
})
export class PaymentvouchernormalModule { }
