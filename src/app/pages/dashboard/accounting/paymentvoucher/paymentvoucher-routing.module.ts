import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentvoucherComponent } from './paymentvoucher.component';

const routes: Routes = [
  {path:'',component:PaymentvoucherComponent,children:[
    {path:'',redirectTo:'explorepaymentvoucher',pathMatch:'full'},
    {path:'explorepaymentvoucher',loadChildren:()=>import('./explorerpaymentvoucher/explorerpaymentvoucher.module').then(m=>m.ExplorerpaymentvoucherModule)},
    {path:'addpaymentvoucher',loadChildren:()=>import('./addpaymentvoucher/addpaymentvoucher.module').then(m=>m.AddpaymentvoucherModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentvoucherRoutingModule { }
