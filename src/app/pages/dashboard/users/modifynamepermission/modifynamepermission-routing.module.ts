import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifynamepermissionComponent } from './modifynamepermission.component';

const routes: Routes = [
  {path:'',component:ModifynamepermissionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifynamepermissionRoutingModule { }
