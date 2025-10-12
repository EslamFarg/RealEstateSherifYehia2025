import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationapartmentComponent } from './classificationapartment.component';

const routes: Routes = [
  {path:'',component:ClassificationapartmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationapartmentRoutingModule { }
