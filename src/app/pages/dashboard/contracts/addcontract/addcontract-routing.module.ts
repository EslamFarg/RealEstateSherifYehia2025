import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcontractComponent } from './addcontract.component';

const routes: Routes = [
  {path:'',component:AddcontractComponent,children:[
    {path:'',redirectTo:'explorercontract',pathMatch:'full'},
    {path:'explorercontract',loadChildren:()=>import('./explorercontract/explorercontract.module').then(m=>m.ExplorercontractModule)},
    {path:'newaddcontract',loadChildren:()=>import('./newaddcontract/newaddcontract.module').then(m=>m.NewaddcontractModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcontractRoutingModule { }
