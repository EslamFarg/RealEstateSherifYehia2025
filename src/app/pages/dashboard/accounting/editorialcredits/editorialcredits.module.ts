import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorialcreditsRoutingModule } from './editorialcredits-routing.module';
import { EditorialcreditsComponent } from './editorialcredits.component';
import { PageHeadingComponent } from "../../../../shared/ui/page-heading/page-heading.component";
import { SearchinformsComponent } from "../../../../shared/ui/searchinforms/searchinforms.component";


@NgModule({
  declarations: [
    EditorialcreditsComponent
  ],
  imports: [
    CommonModule,
    EditorialcreditsRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent
]
})
export class EditorialcreditsModule { }
