import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitytrackingComponent } from './activitytracking.component';

const routes: Routes = [
  {path:'',
    component:ActivitytrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitytrackingRoutingModule { }
