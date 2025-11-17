import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddtenantRoutingModule } from './addtenant-routing.module';
import { AddtenantComponent } from './addtenant.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { InputAttachmentsComponent } from '../../../../../shared/ui/input-attachments/input-attachments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmptytableComponent } from '../../../../../shared/ui/emptytable/emptytable.component';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { DirectivesModule } from "../../../../../shared/directives/directives.module";
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
  declarations: [
    AddtenantComponent
  ],
  imports: [
    CommonModule,
    AddtenantRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    InputAttachmentsComponent,
    ReactiveFormsModule,
    EmptytableComponent,
    ConfirmDeleteComponent,
    DirectivesModule,
    NgxIntlTelInputModule
]
})
export class AddtenantModule { }
