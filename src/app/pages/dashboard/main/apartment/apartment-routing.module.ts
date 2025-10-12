import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentComponent } from './apartment.component';

const routes: Routes = [
  {path:'',component:ApartmentComponent,children:[
    {path:'',redirectTo:'explorerapartment',pathMatch:'full'},
    {path:'explorerapartment',loadChildren:()=>import('./explorerapartment/explorerapartment.module').then(m=>m.ExplorerapartmentModule)},
    {path:'addapartment',loadChildren:()=>import('./addapartment/addapartment.module').then(m=>m.AddapartmentModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
