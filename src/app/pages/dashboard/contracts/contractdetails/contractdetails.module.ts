import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractdetailsRoutingModule } from './contractdetails-routing.module';
import { ContractdetailsComponent } from './contractdetails.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../shared/ui/searchinforms/searchinforms.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ContractdetailsComponent
  ],
  imports: [
    CommonModule,
    ContractdetailsRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    NgSelectModule,
    NgbAccordionModule
  ]
})
export class ContractdetailsModule { }
