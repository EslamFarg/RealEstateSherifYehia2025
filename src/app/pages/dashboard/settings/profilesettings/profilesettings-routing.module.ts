import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesettingsComponent } from './profilesettings.component';

const routes: Routes = [
  {path:'',component:ProfilesettingsComponent,
    children:[
      {path:'',redirectTo:'profile',pathMatch:'full'},
      {path:'profile',loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)},
      {path:'changepassword',loadChildren:()=>import('./changepassword/changepassword.module').then(m=>m.ChangepasswordModule)},
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesettingsRoutingModule { }
