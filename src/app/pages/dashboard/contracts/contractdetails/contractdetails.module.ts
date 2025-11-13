import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractdetailsRoutingModule } from './contractdetails-routing.module';
import { ContractdetailsComponent } from './contractdetails.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../shared/ui/searchinforms/searchinforms.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


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
    NgbAccordionModule,
    EmptytableComponent,
    PaginationComponent
  ]
})
export class ContractdetailsModule { }
