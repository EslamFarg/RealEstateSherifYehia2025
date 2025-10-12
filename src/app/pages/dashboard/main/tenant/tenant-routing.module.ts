import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantComponent } from './tenant.component';

const routes: Routes = [
  {path:'',component:TenantComponent,
    children:[
      {path:'',redirectTo:'explorertenant',pathMatch:'full'},
      {path:'addtenant',loadChildren:()=>import('./addtenant/addtenant.module').then(m=>m.AddtenantModule)},
      {path:'explorertenant',loadChildren:()=>import('./explorertenant/explorertenant.module').then(m=>m.ExplorertenantModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
