import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpaymentreceiptvoucherComponent } from './addpaymentreceiptvoucher.component';

const routes: Routes = [
  {path:'',component:AddpaymentreceiptvoucherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpaymentreceiptvoucherRoutingModule { }
