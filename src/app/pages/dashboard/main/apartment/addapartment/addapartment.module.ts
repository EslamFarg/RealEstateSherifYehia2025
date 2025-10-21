import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddapartmentRoutingModule } from './addapartment-routing.module';
import { AddapartmentComponent } from './addapartment.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RefreshSelectComponent } from "../../../../../shared/ui/refresh-select/refresh-select.component";
import { ImgattachmentsComponent } from "../../../../../shared/ui/imgattachments/imgattachments.component";
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    AddapartmentComponent
  ],
  imports: [
    CommonModule,
    AddapartmentRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    RefreshSelectComponent,
    ImgattachmentsComponent,
    ReactiveFormsModule,
    ConfirmDeleteComponent
]
})
export class AddapartmentModule { }
