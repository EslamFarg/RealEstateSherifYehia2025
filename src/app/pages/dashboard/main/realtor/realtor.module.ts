import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealtorRoutingModule } from './realtor-routing.module';
import { InputAttachmentsComponent } from '../../../../shared/ui/input-attachments/input-attachments.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { RealtorComponent } from './realtor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
// import {  } from '@angular/forms';
@NgModule({
  declarations: [RealtorComponent],
  imports: [
    CommonModule,
    RealtorRoutingModule,
    InputAttachmentsComponent,
    PageHeadingComponent,
    NgSelectModule,
    PaginationComponent
    
  ]
})
export class RealtorModule { }
