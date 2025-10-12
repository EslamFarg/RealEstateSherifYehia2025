import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendmessageComponent } from './sendmessage.component';

const routes: Routes = [
  {path:'',component:SendmessageComponent,children:[
    {path:'',redirectTo:'explorersendmessage',pathMatch:'full'},
    {path:'explorersendmessage',loadChildren:()=>import('./explorersendmessage/explorersendmessage.module').then(m=>m.ExplorersendmessageModule)},
    {path:'addsendmessage',loadChildren:()=>import('./addsendmessage/addsendmessage.module').then(m=>m.AddsendmessageModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendmessageRoutingModule { }
