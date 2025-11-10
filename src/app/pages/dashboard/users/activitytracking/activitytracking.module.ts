import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitytrackingRoutingModule } from './activitytracking-routing.module';
import { ActivitytrackingComponent } from './activitytracking.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../shared/ui/searchinforms/searchinforms.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { FormerrorMsgComponent } from "../../../../shared/ui/formerror-msg/formerror-msg.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IntersectionDirective } from "../../../../shared/directives/intersection.directive";
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';


@NgModule({
  declarations: [
    ActivitytrackingComponent
  ],
  imports: [
    CommonModule,
    ActivitytrackingRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    PaginationComponent,
    FormerrorMsgComponent,
    FormsModule,
    IntersectionDirective,
    ReactiveFormsModule,
    EmptytableComponent
]
})
export class ActivitytrackingModule { }
