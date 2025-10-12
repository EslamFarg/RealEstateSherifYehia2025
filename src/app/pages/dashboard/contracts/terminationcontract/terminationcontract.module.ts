import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminationcontractRoutingModule } from './terminationcontract-routing.module';
import { TerminationcontractComponent } from './terminationcontract.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    TerminationcontractComponent
  ],
  imports: [
    CommonModule,
    TerminationcontractRoutingModule,
    PageHeadingComponent,
    NgbAccordionModule,
    NgSelectModule,
    
]
})
export class TerminationcontractModule { }
