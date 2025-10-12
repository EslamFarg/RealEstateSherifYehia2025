import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageformsComponent } from './messageforms.component';

const routes: Routes = [
  {path:'',component:MessageformsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageformsRoutingModule { }
