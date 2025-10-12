import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalifisComponent } from './salifis.component';

const routes: Routes = [
  {path:'',component:SalifisComponent,children:[
    {path:'',redirectTo:'explorersalifs',pathMatch:'full'},
    {path:'explorersalifs',loadChildren:()=>import('./explorersalifs/explorersalifs.module').then(m=>m.ExplorersalifsModule)},
    {path:'addsalifs',loadChildren:()=>import('./addsalifs/addsalifs.module').then(m=>m.AddsalifsModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalifisRoutingModule { }
