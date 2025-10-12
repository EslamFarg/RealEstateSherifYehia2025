import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorermaintenanceComponent } from './explorermaintenance.component';

const routes: Routes = [
  {path:'',component:ExplorermaintenanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorermaintenanceRoutingModule { }
