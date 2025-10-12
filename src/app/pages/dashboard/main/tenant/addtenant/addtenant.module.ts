import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddtenantRoutingModule } from './addtenant-routing.module';
import { AddtenantComponent } from './addtenant.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputAttachmentsComponent } from '../../../../../shared/ui/input-attachments/input-attachments.component';


@NgModule({
  declarations: [
    AddtenantComponent
  ],
  imports: [
    CommonModule,
    AddtenantRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    InputAttachmentsComponent
  ]
})
export class AddtenantModule { }
