import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorersalifsRoutingModule } from './explorersalifs-routing.module';
import { ExplorersalifsComponent } from './explorersalifs.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from '../../../../../shared/ui/search-data/search-data.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ExplorersalifsComponent
  ],
  imports: [
    CommonModule,
    ExplorersalifsRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    PaginationComponent
  ]
})
export class ExplorersalifsModule { }
