import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmaintenanceRoutingModule } from './addmaintenance-routing.module';
import { AddmaintenanceComponent } from './addmaintenance.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../../shared/ui/searchinforms/searchinforms.component';
import { RefreshSelectComponent } from '../../../../../shared/ui/refresh-select/refresh-select.component';
import { PopupAttachmentsComponent } from '../../../../../shared/ui/popup-attachments/popup-attachments.component';
import { InputAttachmentsComponent } from '../../../../../shared/ui/input-attachments/input-attachments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from "../../../../../shared/directives/directives.module";
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { PrintpageMaintenanceComponent } from '../../../../../shared/components/printpage-maintenance/printpage.component';
import { PopupSearchMaintenanceComponent } from '../../../../../shared/ui/popup-search-maintenance/popup-search.component';


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
    InputAttachmentsComponent,
    ReactiveFormsModule,
    DirectivesModule,
    ConfirmDeleteComponent,
    PrintpageMaintenanceComponent,
    PopupSearchMaintenanceComponent
]
})
export class AddmaintenanceModule { }
