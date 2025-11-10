import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSalaryDisbursementRoutingModule } from './add-salary-disbursement-routing.module';
import { AddSalaryDisbursementComponent } from './add-salary-disbursement.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrintemployeeComponent } from '../../../../../shared/ui/printemployee/printemployee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormerrorMsgComponent } from '../../../../../shared/ui/formerror-msg/formerror-msg.component';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [AddSalaryDisbursementComponent],
  imports: [
    CommonModule,
    AddSalaryDisbursementRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    PrintemployeeComponent,
    ReactiveFormsModule,
    FormerrorMsgComponent,
    ConfirmDeleteComponent
  ]
})
export class AddSalaryDisbursementModule { }
