import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpaymentvoucherComponent } from './addpaymentvoucher.component';

const routes: Routes = [
  {path:'',component:AddpaymentvoucherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpaymentvoucherRoutingModule { }
