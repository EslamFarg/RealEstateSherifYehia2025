import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaindataComponent } from './maindata.component';

const routes: Routes = [
  {path:'',component:MaindataComponent,children:[
 {path:'',redirectTo:'programsettings',pathMatch:'full'},
  {path:'programsettings',loadChildren:()=>import('./programsettings/programsettings.module').then(m=>m.ProgramsettingsModule)},
  {path:'termsandconditions',loadChildren:()=>import('./termsandconditions/termsandconditions.module').then(m=>m.TermsandconditionsModule)}

  ]}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaindataRoutingModule { }
