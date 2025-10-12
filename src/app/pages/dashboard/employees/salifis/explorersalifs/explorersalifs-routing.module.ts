import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorersalifsComponent } from './explorersalifs.component';

const routes: Routes = [
  {path:'',component:ExplorersalifsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorersalifsRoutingModule { }
