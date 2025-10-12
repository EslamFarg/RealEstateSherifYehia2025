import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountstatementRoutingModule } from './accountstatement-routing.module';
import { AccountstatementComponent } from './accountstatement.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    AccountstatementComponent
  ],
  imports: [
    CommonModule,
    AccountstatementRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    PaginationComponent
  ]
})
export class AccountstatementModule { }
