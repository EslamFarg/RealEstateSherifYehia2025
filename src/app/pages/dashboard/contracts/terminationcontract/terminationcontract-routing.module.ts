import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminationcontractComponent } from './terminationcontract.component';

const routes: Routes = [
  {path:'',component:TerminationcontractComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminationcontractRoutingModule { }
