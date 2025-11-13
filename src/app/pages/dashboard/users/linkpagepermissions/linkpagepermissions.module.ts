import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkpagepermissionsRoutingModule } from './linkpagepermissions-routing.module';
import { LinkpagepermissionsComponent } from './linkpagepermissions.component';
import { PageHeadingComponent } from "../../../../shared/ui/page-heading/page-heading.component";
import { EmptytableComponent } from "../../../../shared/ui/emptytable/emptytable.component";
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    LinkpagepermissionsComponent
  ],
  imports: [
    CommonModule,
    LinkpagepermissionsRoutingModule,
    PageHeadingComponent,
    EmptytableComponent,
    ReactiveFormsModule,
    NgSelectModule,
    PaginationComponent,
    ConfirmDeleteComponent
]
})
export class LinkpagepermissionsModule { }
