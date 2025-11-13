import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcatgrouppermissionsRoutingModule } from './concatgrouppermissions-routing.module';
import { ConcatgrouppermissionsComponent } from './concatgrouppermissions.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConcatgrouppermissionsComponent
  ],
  imports: [
    CommonModule,
    ConcatgrouppermissionsRoutingModule,
    PageHeadingComponent,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class ConcatgrouppermissionsModule { }
