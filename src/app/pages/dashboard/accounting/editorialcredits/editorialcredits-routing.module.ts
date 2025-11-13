import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorialcreditsComponent } from './editorialcredits.component';

const routes: Routes = [
  {
    path:'',component:EditorialcreditsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorialcreditsRoutingModule { }
