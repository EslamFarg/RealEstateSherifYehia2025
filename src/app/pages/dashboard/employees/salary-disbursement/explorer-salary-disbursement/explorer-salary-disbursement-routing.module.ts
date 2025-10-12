import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerSalaryDisbursementComponent } from './explorer-salary-disbursement.component';

const routes: Routes = [
  {path:'',component:ExplorerSalaryDisbursementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerSalaryDisbursementRoutingModule { }
