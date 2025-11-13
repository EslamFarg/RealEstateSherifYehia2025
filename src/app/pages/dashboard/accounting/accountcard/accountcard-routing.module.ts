import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountcardComponent } from './accountcard.component';

const routes: Routes = [
  {path:'',component:AccountcardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountcardRoutingModule { }
