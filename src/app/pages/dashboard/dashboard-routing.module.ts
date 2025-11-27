import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PermissionGuard } from '../../core/guards/permission.guard';
import { UnauthorizedComponent } from '../../shared/components/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./main/home/home.module').then((m) => m.HomeModule),
        data: { pageId: 41 },
      },
      {
        path: 'owner',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./main/owner/owner.module').then((m) => m.OwnerModule),
        data: { pageId: 1 },
      },
      {
        path: 'realtor',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./main/realtor/realtor.module').then((m) => m.RealtorModule),
        data: { pageId: 2 },
      },
      {
        path: 'tenant',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./main/tenant/tenant.module').then((m) => m.TenantModule),
        data: { pageId: 3 },
      },
      {
        path: 'building',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./main/building/building.module').then(
            (m) => m.BuildingModule
          ),
        data: { pageId: 4 },
      },
      {
        path: 'apartment',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./main/apartment/apartment.module').then(
            (m) => m.ApartmentModule
          ),
        data: { pageId: 5 },
      },
      {
        path: 'classification',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import(
            './main/classificationapartment/classificationapartment.module'
          ).then((m) => m.ClassificationapartmentModule),
        data: { pageId: 6 },
      },
      {
        path: 'treereal',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./main/treereal/treereal.module').then(
            (m) => m.TreerealModule
          ),
        data: { pageId: 37 },
      },
      {
        path: 'maintenance',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./maintenance/maintenance/maintenance.module').then(
            (m) => m.MaintenanceModule
          ),
        data: { pageId: 7 },
      },
      {
        path: 'typemaintenance',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./maintenance/typemaintenance/typemaintenance.module').then(
            (m) => m.TypemaintenanceModule
          ),
        data: { pageId: 8 },
      },
      {
        path: 'employees',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./employees/employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
        data: { pageId: 9 },
      },
      {
        path: 'salarydisbursement',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import(
            './employees/salary-disbursement/salary-disbursement.module'
          ).then((m) => m.SalaryDisbursementModule),
        data: { pageId: 10 },
      },
      {
        path: 'salifis',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./employees/salifis/salifis.module').then(
            (m) => m.SalifisModule
          ),
        data: { pageId: 11 },
      },
      {
        path: 'newuser',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./users/newuser/newuser.module').then((m) => m.NewuserModule),
          data: { pageId: 12 },
      },
      {
        path: 'groupusers',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./users/group/group.module').then((m) => m.GroupModule),
          data: { pageId: 13 },
      },
      {
        path: 'activitytracking',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./users/activitytracking/activitytracking.module').then(
            (m) => m.ActivitytrackingModule
          ),
        data: { pageId: 14 },
      },
      {
        path: 'msgform',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./messages/messageforms/messageforms.module').then(
            (m) => m.MessageformsModule
          ),
          data: { pageId: 18 },
      },
      {
        path: 'sendmessage',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./messages/sendmessage/sendmessage.module').then(
            (m) => m.SendmessageModule
          ),
          data: { pageId: 19 },
      },
      {
        path: 'profilesettings',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./settings/profilesettings/profilesettings.module').then(
            (m) => m.ProfilesettingsModule
          ),
          data: { pageId: 22 },
      },
      {
        path: 'maindata',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./settings/maindata/maindata.module').then(
            (m) => m.MaindataModule
          ),
          data: { pageId: 25 },
      },
      {
        path: 'addcontract',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./contracts/addcontract/addcontract.module').then(
            (m) => m.AddcontractModule
          ),
          data: { pageId: 27 },
      },
      {
        path: 'contractrenewal',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./contracts/contractrenewal/contractrenewal.module').then(
            (m) => m.ContractrenewalModule
          ),
      },
      {
        path: 'querycontract',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./contracts/contractdetails/contractdetails.module').then(
            (m) => m.ContractdetailsModule
          ),
          data: { pageId: 39 },
      },
      {
        path: 'terminationcontract',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import(
            './contracts/terminationcontract/terminationcontract.module'
          ).then((m) => m.TerminationcontractModule),
      },
      {
        path: 'paymentvoucher',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./accounting/paymentvoucher/paymentvoucher.module').then(
            (m) => m.PaymentvoucherModule
          ),
          data: { pageId: 28 },
      },
      {
        path: 'realtorpaymentvoucher',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import(
            './accounting/realtorpaymentvoucher/realtorpaymentvoucher.module'
          ).then((m) => m.RealtorpaymentvoucherModule),
          data: { pageId: 29 },
      },
      {
        path: 'paymentreceiptvoucher',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import(
            './accounting/paymentreceiptvoucher/paymentreceiptvoucher.module'
          ).then((m) => m.PaymentreceiptvoucherModule),
          data: { pageId: 30 },
      },
      {
        path: 'receiptvoucher',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./accounting/receiptvoucher/receiptvoucher.module').then(
            (m) => m.ReceiptvoucherModule
          ),
          data: { pageId: 31 },
      },
      {
        path: 'paymentvouchernormal',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import(
            './accounting/paymentvouchernormal/paymentvouchernormal.module'
          ).then((m) => m.PaymentvouchernormalModule),
          data: { pageId: 32 },
      },
      {
        path: 'accounts',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./accounting/accounts/accounts.module').then(
            (m) => m.AccountsModule
          ),
          data: { pageId: 36 },
      },
      {
        path: 'accountstatement',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./accounting/accountstatement/accountstatement.module').then(
            (m) => m.AccountstatementModule
          ),
          data: { pageId: 34 },
      },
      {
        path: 'messagesetting',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./messages/messagesettings/messagesettings.module').then(
            (m) => m.MessagesettingsModule
          ),
          data: { pageId: 20 },
      },
      {
        path: 'groupmessage',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./messages/groupmessage/groupmessage.module').then(
            (m) => m.GroupmessageModule
          ),
          data: { pageId: 21 },
      },
      {
        path: 'linkpagepermission',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./users/linkpagepermissions/linkpagepermissions.module').then(
            (m) => m.LinkpagepermissionsModule
          ),
          data: { pageId: 15 },
      },
      {
        path: 'linkgrouppage',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./users/linkgrouppages/linkgrouppages.module').then(
            (m) => m.LinkgrouppagesModule
          ),
          data: { pageId: 16 },
      },
      {
        path: 'modifynamepermission',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import(
            './users/modifynamepermission/modifynamepermission.module'
          ).then((m) => m.ModifynamepermissionModule),
          data: { pageId: 38 },
      },
      {
        path: 'concatgrouppermission',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import(
            './users/concatgrouppermissions/concatgrouppermissions.module'
          ).then((m) => m.ConcatgrouppermissionsModule),
          data: { pageId: 17 },
      },
      {
        path: 'editorialcredits',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./accounting/editorialcredits/editorialcredits.module').then(
            (m) => m.EditorialcreditsModule
          ),
          data: { pageId: 35 },
      },
      {
        path: 'accountcard',
        canActivate: [PermissionGuard],
        loadChildren: () =>
          import('./accounting/accountcard/accountcard.module').then(
            (m) => m.AccountcardModule
          ),
          data: { pageId: 40 },
      },
      {path:'permissions',loadChildren:()=>import('./users/permissions/permissions.module').then((m)=>m.PermissionsModule)},
      { path: 'unauthorized', component: UnauthorizedComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
