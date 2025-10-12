import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSalaryDisbursementComponent } from './add-salary-disbursement.component';

const routes: Routes = [
  {path:'',component:AddSalaryDisbursementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSalaryDisbursementRoutingModule { }
