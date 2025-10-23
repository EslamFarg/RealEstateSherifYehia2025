import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupmessageRoutingModule } from './groupmessage-routing.module';
import { GroupmessageComponent } from './groupmessage.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../shared/ui/searchinforms/searchinforms.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    GroupmessageComponent
  ],
  imports: [
    CommonModule,
    GroupmessageRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule
]
})
export class GroupmessageModule { }
