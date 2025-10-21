import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationapartmentRoutingModule } from './classificationapartment-routing.module';
import { ClassificationapartmentComponent } from './classificationapartment.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    ClassificationapartmentComponent
  ],
  imports: [
    CommonModule,
    ClassificationapartmentRoutingModule,
    PageHeadingComponent,
    // PaginationComponent
    PaginationComponent,
    ReactiveFormsModule,
    EmptytableComponent,
    ConfirmDeleteComponent
  ]
})
export class ClassificationapartmentModule { }
