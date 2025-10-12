import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddrealtorpaymentvoucherComponent } from './addrealtorpaymentvoucher.component';

const routes: Routes = [
  {path:'',component:AddrealtorpaymentvoucherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddrealtorpaymentvoucherRoutingModule { }
