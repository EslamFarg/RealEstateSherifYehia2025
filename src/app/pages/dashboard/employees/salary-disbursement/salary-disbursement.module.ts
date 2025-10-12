import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryDisbursementRoutingModule } from './salary-disbursement-routing.module';
import { AddSalaryDisbursementComponent } from './add-salary-disbursement/add-salary-disbursement.component';
import { ExplorerSalaryDisbursementComponent } from './explorer-salary-disbursement/explorer-salary-disbursement.component';
import { SalaryDisbursementComponent } from './salary-disbursement.component';


@NgModule({
  declarations: [
    SalaryDisbursementComponent,
  ],
  imports: [
    CommonModule,
    SalaryDisbursementRoutingModule
  ]
})
export class SalaryDisbursementModule { }
