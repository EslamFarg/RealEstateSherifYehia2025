import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerapartmentRoutingModule } from './explorerapartment-routing.module';
import { ExplorerapartmentComponent } from './explorerapartment.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from '../../../../../shared/ui/search-data/search-data.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';



@NgModule({
  declarations: [
    ExplorerapartmentComponent
  ],
  imports: [
    CommonModule,
    ExplorerapartmentRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    PaginationComponent
  ]
})
export class ExplorerapartmentModule { }
