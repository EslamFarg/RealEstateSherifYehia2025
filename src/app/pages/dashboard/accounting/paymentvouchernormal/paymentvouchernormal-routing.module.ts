import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentvouchernormalComponent } from './paymentvouchernormal.component';

const routes: Routes = [
  {path:'',component:PaymentvouchernormalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentvouchernormalRoutingModule { }
