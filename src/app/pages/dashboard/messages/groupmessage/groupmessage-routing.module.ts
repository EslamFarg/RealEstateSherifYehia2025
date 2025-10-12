import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupmessageComponent } from './groupmessage.component';

const routes: Routes = [
  {path:'',component:GroupmessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupmessageRoutingModule { }
