import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorercontractRoutingModule } from './explorercontract-routing.module';
import { ExplorercontractComponent } from './explorercontract.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';
import { SearchDataComponent } from '../../../../../shared/ui/search-data/search-data.component';


@NgModule({
  declarations: [
    ExplorercontractComponent
  ],
  imports: [
    CommonModule,
    ExplorercontractRoutingModule,
    PageHeadingComponent,
    PaginationComponent,
    SearchDataComponent

  ]
})
export class ExplorercontractModule { }
