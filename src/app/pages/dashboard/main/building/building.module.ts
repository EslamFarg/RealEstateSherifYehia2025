import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { BuildingComponent } from './building.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { IntersectionDirective } from "../../../../shared/directives/intersection.directive";
import { NgSelectModule } from '@ng-select/ng-select';
import { ImgattachmentsComponent } from '../../../../shared/ui/imgattachments/imgattachments.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { RefreshSelectComponent } from '../../../../shared/ui/refresh-select/refresh-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { DirectivesModule } from "../../../../shared/directives/directives.module";


@NgModule({
  declarations: [
    BuildingComponent
  ],
  imports: [
    CommonModule,
    BuildingRoutingModule,
    PageHeadingComponent,
    IntersectionDirective,
    NgSelectModule,
    ImgattachmentsComponent,
    PaginationComponent,
    RefreshSelectComponent,
    ReactiveFormsModule,
    EmptytableComponent,
    ConfirmDeleteComponent,
    DirectivesModule
]
})
export class BuildingModule { }
