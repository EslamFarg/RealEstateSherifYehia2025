import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'auth',loadChildren:()=>import('./pages/auth/auth.module').then(m=>m.AuthModule),canActivate:[loginGuard]},
  {path:'dashboard',loadChildren:()=>import('./pages/dashboard/dashboard.module').then(m=>m.DashboardModule),canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration:'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
