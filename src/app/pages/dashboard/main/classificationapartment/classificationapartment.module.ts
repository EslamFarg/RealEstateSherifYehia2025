import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationapartmentRoutingModule } from './classificationapartment-routing.module';
import { ClassificationapartmentComponent } from './classificationapartment.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ClassificationapartmentComponent
  ],
  imports: [
    CommonModule,
    ClassificationapartmentRoutingModule,
    PageHeadingComponent,
    // PaginationComponent
    PaginationComponent
  ]
})
export class ClassificationapartmentModule { }
