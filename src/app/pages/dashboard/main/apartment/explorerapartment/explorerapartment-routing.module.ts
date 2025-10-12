import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerapartmentComponent } from './explorerapartment.component';

const routes: Routes = [
  {path:'',component:ExplorerapartmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerapartmentRoutingModule { }
