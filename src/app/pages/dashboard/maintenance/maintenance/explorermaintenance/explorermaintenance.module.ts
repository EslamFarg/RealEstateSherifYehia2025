import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorermaintenanceRoutingModule } from './explorermaintenance-routing.module';
import { ExplorermaintenanceComponent } from './explorermaintenance.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from '../../../../../shared/ui/search-data/search-data.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';
import { EmptytableComponent } from '../../../../../shared/ui/emptytable/emptytable.component';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    ExplorermaintenanceComponent
  ],
  imports: [
    CommonModule,
    ExplorermaintenanceRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    PaginationComponent,
    EmptytableComponent,
    ConfirmDeleteComponent
  ]
})
export class ExplorermaintenanceModule { }
