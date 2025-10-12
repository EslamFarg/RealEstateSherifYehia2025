import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorertenantComponent } from './explorertenant.component';

const routes: Routes = [
  {
    path:'',component:ExplorertenantComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorertenantRoutingModule { }
