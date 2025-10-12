import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaindataRoutingModule } from './maindata-routing.module';
import { MaindataComponent } from './maindata.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';


@NgModule({
  declarations: [
    MaindataComponent
  ],
  imports: [
    CommonModule,
    MaindataRoutingModule,
    PageHeadingComponent
  ]
})
export class MaindataModule { }
