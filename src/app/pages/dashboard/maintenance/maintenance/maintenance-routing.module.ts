import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';

const routes: Routes = [
  {path:'',component:MaintenanceComponent,
    children:[
      {path:'',redirectTo:'explorermaintenance',pathMatch:'full'},
      {path:'explorermaintenance',loadChildren:()=>import('./explorermaintenance/explorermaintenance.module').then(m=>m.ExplorermaintenanceModule)},
      {path:'addmaintenance',loadChildren:()=>import('./addmaintenance/addmaintenance.module').then(m=>m.AddmaintenanceModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
