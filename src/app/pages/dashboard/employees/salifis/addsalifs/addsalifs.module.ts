import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddsalifsRoutingModule } from './addsalifs-routing.module';
import { AddsalifsComponent } from './addsalifs.component';
import { PaginationComponent } from '../../../../../shared/ui/pagination/pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { PrintemployeeComponent } from '../../../../../shared/ui/printemployee/printemployee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from "../../../../../shared/directives/directives.module";
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { PrintpageSalifsComponent } from '../../../../../shared/components/printpage-salifs/printpage.component';


@NgModule({
  declarations: [
    AddsalifsComponent
  ],
  imports: [
    CommonModule,
    AddsalifsRoutingModule,
    PaginationComponent,
    NgSelectModule,
    PageHeadingComponent,
    PrintemployeeComponent,
    ReactiveFormsModule,
    DirectivesModule,
    ConfirmDeleteComponent,
    PrintpageSalifsComponent
]
})
export class AddsalifsModule { }
