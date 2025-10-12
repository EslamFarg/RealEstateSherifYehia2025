import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmaintenanceRoutingModule } from './addmaintenance-routing.module';
import { AddmaintenanceComponent } from './addmaintenance.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../../shared/ui/searchinforms/searchinforms.component';
import { RefreshSelectComponent } from '../../../../../shared/ui/refresh-select/refresh-select.component';
import { PopupAttachmentsComponent } from '../../../../../shared/ui/popup-attachments/popup-attachments.component';
import { InputAttachmentsComponent } from '../../../../../shared/ui/input-attachments/input-attachments.component';


@NgModule({
  declarations: [
    AddmaintenanceComponent
  ],
  imports: [
    CommonModule,
    AddmaintenanceRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    RefreshSelectComponent,
    InputAttachmentsComponent
  ]
})
export class AddmaintenanceModule { }
