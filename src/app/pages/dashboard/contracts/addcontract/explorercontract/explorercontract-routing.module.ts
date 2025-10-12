import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorercontractComponent } from './explorercontract.component';

const routes: Routes = [
  {path:'',component:ExplorercontractComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorercontractRoutingModule { }
