import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypemaintenanceRoutingModule } from './typemaintenance-routing.module';
import { TypemaintenanceComponent } from './typemaintenance.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    TypemaintenanceComponent
  ],
  imports: [
    CommonModule,
    TypemaintenanceRoutingModule,
    PageHeadingComponent,
    PaginationComponent
  ]
})
export class TypemaintenanceModule { }
