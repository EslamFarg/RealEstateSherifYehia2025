import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentreceiptvoucherComponent } from './paymentreceiptvoucher.component';

const routes: Routes = [
  {path:'',component:PaymentreceiptvoucherComponent,children:[
    {path:'',redirectTo:'explorerpaymentreceiptvoucher',pathMatch:'full'},
    {path:'explorerpaymentreceiptvoucher',loadChildren:()=>import('./explorerpaymentreceiptvoucher/explorerpaymentreceiptvoucher.module').then(m=>m.ExplorerpaymentreceiptvoucherModule)},
    {path:'addpaymentreceiptvoucher',loadChildren:()=>import('./addpaymentreceiptvoucher/addpaymentreceiptvoucher.module').then(m=>m.AddpaymentreceiptvoucherModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentreceiptvoucherRoutingModule { }
