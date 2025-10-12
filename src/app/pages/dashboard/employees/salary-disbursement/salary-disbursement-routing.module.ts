import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryDisbursementComponent } from './salary-disbursement.component';

const routes: Routes = [
  {path:'',component:SalaryDisbursementComponent,
    children:[
      {path:'',redirectTo:'explorerdisbursement',pathMatch:'full'},
      {path:'explorerdisbursement',loadChildren:()=>import('./explorer-salary-disbursement/explorer-salary-disbursement.module').then(m=>m.ExplorerSalaryDisbursementModule)},
      {path:'addsalarydisbursement',loadChildren:()=>import('./add-salary-disbursement/add-salary-disbursement.module').then(m=>m.AddSalaryDisbursementModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaryDisbursementRoutingModule { }
