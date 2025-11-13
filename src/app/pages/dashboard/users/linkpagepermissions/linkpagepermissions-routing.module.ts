import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkpagepermissionsComponent } from './linkpagepermissions.component';

const routes: Routes = [
  {path:'',component:LinkpagepermissionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkpagepermissionsRoutingModule { }
