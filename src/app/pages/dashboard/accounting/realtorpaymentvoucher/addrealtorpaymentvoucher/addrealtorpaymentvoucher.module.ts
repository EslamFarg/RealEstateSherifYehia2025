import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddrealtorpaymentvoucherRoutingModule } from './addrealtorpaymentvoucher-routing.module';
import { AddrealtorpaymentvoucherComponent } from './addrealtorpaymentvoucher.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { SearchinformsComponent } from '../../../../../shared/ui/searchinforms/searchinforms.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormerrorMsgComponent } from '../../../../../shared/ui/formerror-msg/formerror-msg.component';
import { IntersectionDirective } from "../../../../../shared/directives/intersection.directive";
import { EmptytableComponent } from '../../../../../shared/ui/emptytable/emptytable.component';


@NgModule({
  declarations: [
    AddrealtorpaymentvoucherComponent
  ],
  imports: [
    CommonModule,
    AddrealtorpaymentvoucherRoutingModule,
    PageHeadingComponent,
    SearchinformsComponent,
    NgSelectModule,
    ReactiveFormsModule,
    FormerrorMsgComponent,
    IntersectionDirective,
    EmptytableComponent,
    // FormsModule
]
})
export class AddrealtorpaymentvoucherModule { }
