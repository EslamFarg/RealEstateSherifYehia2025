import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSalaryDisbursementRoutingModule } from './add-salary-disbursement-routing.module';
import { AddSalaryDisbursementComponent } from './add-salary-disbursement.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrintemployeeComponent } from '../../../../../shared/ui/printemployee/printemployee.component';


@NgModule({
  declarations: [AddSalaryDisbursementComponent],
  imports: [
    CommonModule,
    AddSalaryDisbursementRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    PrintemployeeComponent
  ]
})
export class AddSalaryDisbursementModule { }
