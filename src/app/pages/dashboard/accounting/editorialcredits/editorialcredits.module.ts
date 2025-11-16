import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorialcreditsRoutingModule } from './editorialcredits-routing.module';
import { EditorialcreditsComponent } from './editorialcredits.component';
import { PageHeadingComponent } from "../../../../shared/ui/page-heading/page-heading.component";
import { SearchinformsComponent } from "../../../../shared/ui/searchinforms/searchinforms.component";
import { EmptytableComponent } from "../../../../shared/ui/emptytable/emptytable.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditorialcreditsComponent
  ],
  imports: [
    CommonModule,
    EditorialcreditsRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    EmptytableComponent,
    ReactiveFormsModule,
    FormsModule
]
})
export class EditorialcreditsModule { }
