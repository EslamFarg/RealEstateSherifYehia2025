import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractrenewalRoutingModule } from './contractrenewal-routing.module';
import { ContractrenewalComponent } from './contractrenewal.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormerrorMsgComponent } from '../../../../shared/ui/formerror-msg/formerror-msg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { InputAttachmentsComponent } from '../../../../shared/ui/input-attachments/input-attachments.component';


@NgModule({
  declarations: [
    ContractrenewalComponent
  ],
  imports: [
    CommonModule,
    ContractrenewalRoutingModule,
    PageHeadingComponent,
    NgbAccordionModule,
      NgSelectModule,
        ReactiveFormsModule,
        FormerrorMsgComponent,
        ConfirmDeleteComponent,
       InputAttachmentsComponent
        
  ]
})
export class ContractrenewalModule { }
