import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
    children:[
      {path:'',redirectTo:'owner',pathMatch:'full'},
      {path:'owner',loadChildren:()=>import('./main/owner/owner.module').then(m=>m.OwnerModule)},
      {path:'realtor',loadChildren:()=>import('./main/realtor/realtor.module').then(m=>m.RealtorModule)},
      {path:'tenant',loadChildren:()=>import('./main/tenant/tenant.module').then(m=>m.TenantModule)},
      {path:'building',loadChildren:()=>import('./main/building/building.module').then(m=>m.BuildingModule)},
      {path:'apartment',loadChildren:()=>import('./main/apartment/apartment.module').then(m=>m.ApartmentModule)},
      {path:'classification',loadChildren:()=>import('./main/classificationapartment/classificationapartment.module').then(m=>m.ClassificationapartmentModule)},
      {path:'treereal',loadChildren:()=>import('./main/treereal/treereal.module').then(m=>m.TreerealModule)},
      {path:'maintenance',loadChildren:()=>import('./maintenance/maintenance/maintenance.module').then(m=>m.MaintenanceModule)},
      {path:'typemaintenance',loadChildren:()=>import('./maintenance/typemaintenance/typemaintenance.module').then(m=>m.TypemaintenanceModule)},
      {path:'employees',loadChildren:()=>import('./employees/employees/employees.module').then(m=>m.EmployeesModule)},
      {path:'salarydisbursement',loadChildren:()=>import('./employees/salary-disbursement/salary-disbursement.module').then(m=>m.SalaryDisbursementModule)},
      {path:'salifis',loadChildren:()=>import('./employees/salifis/salifis.module').then(m=>m.SalifisModule)},
      {path:'newuser',loadChildren:()=>import('./users/newuser/newuser.module').then(m=>m.NewuserModule)},
      {path:'groupusers',loadChildren:()=>import('./users/group/group.module').then(m=>m.GroupModule)},
      {path:'activitytracking',loadChildren:()=>import('./users/activitytracking/activitytracking.module').then(m=>m.ActivitytrackingModule)},
      {path:'msgform',loadChildren:()=>import('./messages/messageforms/messageforms.module').then(m=>m.MessageformsModule)},
      {path:'sendmessage',loadChildren:()=>import('./messages/sendmessage/sendmessage.module').then(m=>m.SendmessageModule)},
      {path:'profilesettings',loadChildren:()=>import('./settings/profilesettings/profilesettings.module').then(m=>m.ProfilesettingsModule)},
      {path:'maindata',loadChildren:()=>import('./settings/maindata/maindata.module').then(m=>m.MaindataModule)},
      {path:'addcontract',loadChildren:()=>import('./contracts/addcontract/addcontract.module').then(m=>m.AddcontractModule)},
      {path:'querycontract',loadChildren:()=>import('./contracts/contractdetails/contractdetails.module').then(m=>m.ContractdetailsModule)},
      {path:'terminationcontract/:id',loadChildren:()=>import('./contracts/terminationcontract/terminationcontract.module').then(m=>m.TerminationcontractModule)},
      {path:'paymentvoucher',loadChildren:()=>import('./accounting/paymentvoucher/paymentvoucher.module').then(m=>m.PaymentvoucherModule)},
      {path:'realtorpaymentvoucher',loadChildren:()=>import('./accounting/realtorpaymentvoucher/realtorpaymentvoucher.module').then(m=>m.RealtorpaymentvoucherModule)},
      {path:'paymentreceiptvoucher',loadChildren:()=>import('./accounting/paymentreceiptvoucher/paymentreceiptvoucher.module').then(m=>m.PaymentreceiptvoucherModule)},
      {path:'receiptvoucher',loadChildren:()=>import('./accounting/receiptvoucher/receiptvoucher.module').then(m=>m.ReceiptvoucherModule)},
      {path:'paymentvouchernormal',loadChildren:()=>import('./accounting/paymentvouchernormal/paymentvouchernormal.module').then(m=>m.PaymentvouchernormalModule)},
      {path:'accounts',loadChildren:()=>import('./accounting/accounts/accounts.module').then(m=>m.AccountsModule)},
      {path:'accountstatement',loadChildren:()=>import('./accounting/accountstatement/accountstatement.module').then(m=>m.AccountstatementModule)},
      {path:'messagesetting',loadChildren:()=>import('./messages/messagesettings/messagesettings.module').then(m=>m.MessagesettingsModule)},
      {path:'groupmessage',loadChildren:()=>import('./messages/groupmessage/groupmessage.module').then(m=>m.GroupmessageModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
