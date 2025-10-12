import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    GroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    PageHeadingComponent,
    PaginationComponent
  ]
})
export class GroupModule { }
