import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { InputAttachmentsComponent } from '../../../../shared/ui/input-attachments/input-attachments.component';
import { PopupAttachmentsComponent } from '../../../../shared/ui/popup-attachments/popup-attachments.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../../shared/directives/directives.module';

import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { IntersectionDirective } from "../../../../shared/directives/intersection.directive";
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
  declarations: [
    OwnerComponent,
    // EmptytableComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    PageHeadingComponent,
    InputAttachmentsComponent,
    PopupAttachmentsComponent,
    PaginationComponent,
    ReactiveFormsModule,
    DirectivesModule,
    ConfirmDeleteComponent,
    EmptytableComponent,
    NgSelectModule,
    IntersectionDirective,
    NgxIntlTelInputModule
]
})
export class OwnerModule { }
