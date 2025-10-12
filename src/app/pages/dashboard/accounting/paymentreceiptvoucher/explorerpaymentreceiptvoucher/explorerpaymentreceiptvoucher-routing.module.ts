import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerpaymentvoucherComponent } from '../../paymentvoucher/explorerpaymentvoucher/explorerpaymentvoucher.component';
import { ExplorerpaymentreceiptvoucherComponent } from './explorerpaymentreceiptvoucher.component';

const routes: Routes = [
  {path:'',component:ExplorerpaymentreceiptvoucherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerpaymentreceiptvoucherRoutingModule { }
