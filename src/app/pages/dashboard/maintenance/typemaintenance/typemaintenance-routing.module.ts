import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypemaintenanceComponent } from './typemaintenance.component';

const routes: Routes = [{
  path:'',component:TypemaintenanceComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypemaintenanceRoutingModule { }
