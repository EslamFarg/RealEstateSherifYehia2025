import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewuserRoutingModule } from './newuser-routing.module';
import { NewuserComponent } from './newuser.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { RefreshSelectComponent } from '../../../../shared/ui/refresh-select/refresh-select.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';



@NgModule({
  declarations: [
    NewuserComponent
  ],
  imports: [
    CommonModule,
    NewuserRoutingModule,
    PageHeadingComponent,
    RefreshSelectComponent,
    PaginationComponent
  ]
})
export class NewuserModule { }
