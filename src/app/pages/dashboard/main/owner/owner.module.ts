import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './owner.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { InputAttachmentsComponent } from '../../../../shared/ui/input-attachments/input-attachments.component';
import { PopupAttachmentsComponent } from '../../../../shared/ui/popup-attachments/popup-attachments.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';


@NgModule({
  declarations: [
    OwnerComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    PageHeadingComponent,
    InputAttachmentsComponent,
    PopupAttachmentsComponent,
    PaginationComponent
  ]
})
export class OwnerModule { }
