import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputAttachmentsComponent } from '../../../../shared/ui/input-attachments/input-attachments.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    InputAttachmentsComponent,
    PaginationComponent
  ]
})
export class EmployeesModule { }
