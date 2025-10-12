import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmaintenanceComponent } from './addmaintenance.component';

const routes: Routes = [
  {path:'',component:AddmaintenanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmaintenanceRoutingModule { }
