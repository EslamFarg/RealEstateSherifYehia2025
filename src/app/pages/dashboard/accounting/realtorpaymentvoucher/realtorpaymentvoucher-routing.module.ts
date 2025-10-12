import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealtorpaymentvoucherComponent } from './realtorpaymentvoucher.component';

const routes: Routes = [
  {path:'',component:RealtorpaymentvoucherComponent,children:[
    {path:'',redirectTo:'explorerrealtorpaymentvoucher',pathMatch:'full'},
    {path:'addrealtorpaymentvoucher',loadChildren:()=>import('./addrealtorpaymentvoucher/addrealtorpaymentvoucher.module').then(m=>m.AddrealtorpaymentvoucherModule)},
    {path:'explorerrealtorpaymentvoucher',loadChildren:()=>import('./explorerrealtorpaymentvoucher/explorerrealtorpaymentvoucher.module').then(m=>m.ExplorerrealtorpaymentvoucherModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealtorpaymentvoucherRoutingModule { }
