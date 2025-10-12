import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddapartmentComponent } from './addapartment.component';

const routes: Routes = [
  {path:'',component:AddapartmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddapartmentRoutingModule { }
