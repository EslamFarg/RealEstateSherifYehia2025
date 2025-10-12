import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractdetailsComponent } from './contractdetails.component';

const routes: Routes = [
  {path:'',component:ContractdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractdetailsRoutingModule { }
