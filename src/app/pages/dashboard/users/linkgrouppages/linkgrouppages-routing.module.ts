import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkgrouppagesComponent } from './linkgrouppages.component';

const routes: Routes = [
  {path:'',component:LinkgrouppagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkgrouppagesRoutingModule { }
