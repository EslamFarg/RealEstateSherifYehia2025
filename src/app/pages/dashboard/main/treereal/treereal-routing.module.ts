import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreerealComponent } from './treereal.component';

const routes: Routes = [
  {path:'',component:TreerealComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreerealRoutingModule { }
