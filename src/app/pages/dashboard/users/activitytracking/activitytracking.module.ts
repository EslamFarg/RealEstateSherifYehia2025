import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitytrackingRoutingModule } from './activitytracking-routing.module';
import { ActivitytrackingComponent } from './activitytracking.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../shared/ui/searchinforms/searchinforms.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ActivitytrackingComponent
  ],
  imports: [
    CommonModule,
    ActivitytrackingRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    PaginationComponent
  ]
})
export class ActivitytrackingModule { }
