import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewaddcontractRoutingModule } from './newaddcontract-routing.module';
import { NewaddcontractComponent } from './newaddcontract.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ImgattachmentsComponent } from "../../../../../shared/ui/imgattachments/imgattachments.component";
import { InputAttachmentsComponent } from "../../../../../shared/ui/input-attachments/input-attachments.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormerrorMsgComponent } from '../../../../../shared/ui/formerror-msg/formerror-msg.component';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { DirectivesModule } from "../../../../../shared/directives/directives.module";


@NgModule({
  declarations: [
    NewaddcontractComponent
  ],
  imports: [
    CommonModule,
    NewaddcontractRoutingModule,
    PageHeadingComponent,
    PaginationComponent,
    NgbAccordionModule,
    ImgattachmentsComponent,
    InputAttachmentsComponent,
    // NgSelectComponent,
    NgSelectModule,
    ReactiveFormsModule,
    FormerrorMsgComponent,
    ConfirmDeleteComponent,
    DirectivesModule
]
})
export class NewaddcontractModule { }
