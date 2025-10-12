import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorersendmessageRoutingModule } from './explorersendmessage-routing.module';
import { ExplorersendmessageComponent } from './explorersendmessage.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from '../../../../../shared/ui/search-data/search-data.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ExplorersendmessageComponent
  ],
  imports: [
    CommonModule,
    ExplorersendmessageRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    PaginationComponent
  ]
})
export class ExplorersendmessageModule { }
