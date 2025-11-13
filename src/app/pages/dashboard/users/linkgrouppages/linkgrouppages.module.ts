import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkgrouppagesRoutingModule } from './linkgrouppages-routing.module';
import { LinkgrouppagesComponent } from './linkgrouppages.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { EmptytableComponent } from "../../../../shared/ui/emptytable/emptytable.component";
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    LinkgrouppagesComponent
  ],
  imports: [
    CommonModule,
    LinkgrouppagesRoutingModule,
    PageHeadingComponent,
    PaginationComponent,
    EmptytableComponent,
    ReactiveFormsModule,
    NgSelectModule,
    ConfirmDeleteComponent
]
})
export class LinkgrouppagesModule { }
