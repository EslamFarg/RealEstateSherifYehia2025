import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountcardRoutingModule } from './accountcard-routing.module';
import { AccountcardComponent } from './accountcard.component';
import { PageHeadingComponent } from "../../../../shared/ui/page-heading/page-heading.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';


@NgModule({
  declarations: [
    AccountcardComponent
  ],
  imports: [
    CommonModule,
    AccountcardRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    PaginationComponent
]
})
export class AccountcardModule { }
