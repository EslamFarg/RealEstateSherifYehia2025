import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerSalaryDisbursementRoutingModule } from './explorer-salary-disbursement-routing.module';
import { ExplorerSalaryDisbursementComponent } from './explorer-salary-disbursement.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from '../../../../../shared/ui/search-data/search-data.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [ExplorerSalaryDisbursementComponent],
  imports: [
    CommonModule,
    ExplorerSalaryDisbursementRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    PaginationComponent
  ]
})
export class ExplorerSalaryDisbursementModule { }
