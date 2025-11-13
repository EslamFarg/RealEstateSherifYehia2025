import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcatgrouppermissionsModule } from './concatgrouppermissions.module';
import { ConcatgrouppermissionsComponent } from './concatgrouppermissions.component';

const routes: Routes = [
  {
    path:'',component:ConcatgrouppermissionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcatgrouppermissionsRoutingModule { }
