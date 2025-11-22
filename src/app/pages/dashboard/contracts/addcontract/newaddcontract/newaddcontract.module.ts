import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewaddcontractRoutingModule } from './newaddcontract-routing.module';
import { NewaddcontractComponent } from './newaddcontract.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { NgbAccordionModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { ImgattachmentsComponent } from "../../../../../shared/ui/imgattachments/imgattachments.component";
import { InputAttachmentsComponent } from "../../../../../shared/ui/input-attachments/input-attachments.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { FormerrorMsgComponent } from '../../../../../shared/ui/formerror-msg/formerror-msg.component';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { DirectivesModule } from "../../../../../shared/directives/directives.module";
import { PopupSearchUnitComponent } from '../../../../../shared/ui/popup-search-unit/popup-search.component';
import { PopupSearchTenantContractComponent } from '../../../../../shared/ui/popup-search-tenantcontract/popup-search.component';
import { PopupSearchBrokerContractComponent } from '../../../../../shared/ui/popup-search-brokercontract/popup-search.component';
import { PrintpageContractComponent } from '../../../../../shared/components/printpage-contracts/printpage.component';


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
    DirectivesModule,
    PopupSearchUnitComponent,
    PopupSearchTenantContractComponent,
    PopupSearchBrokerContractComponent,
    PrintpageContractComponent,
    NgbCollapse
]
})
export class NewaddcontractModule { }
