import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorersendmessageComponent } from './explorersendmessage.component';

const routes: Routes = [
  {path:'',component:ExplorersendmessageComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorersendmessageRoutingModule { }
