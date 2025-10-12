import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentvouchernormalRoutingModule } from './paymentvouchernormal-routing.module';
import { PaymentvouchernormalComponent } from './paymentvouchernormal.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PaymentvouchernormalComponent
  ],
  imports: [
    CommonModule,
    PaymentvouchernormalRoutingModule,
    PageHeadingComponent,
    PaginationComponent,
    NgSelectModule
  ]
})
export class PaymentvouchernormalModule { }
