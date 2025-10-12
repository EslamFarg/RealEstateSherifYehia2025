import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerrealtorpaymentvoucherComponent } from './explorerrealtorpaymentvoucher.component';

const routes: Routes = [
  {path:'',component:ExplorerrealtorpaymentvoucherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerrealtorpaymentvoucherRoutingModule { }
