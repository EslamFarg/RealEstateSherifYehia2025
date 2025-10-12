import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtenantComponent } from './addtenant.component';

const routes: Routes = [
  {path:'',component:AddtenantComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddtenantRoutingModule { }
