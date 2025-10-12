import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalifisRoutingModule } from './salifis-routing.module';
import { SalifisComponent } from './salifis.component';


@NgModule({
  declarations: [
    SalifisComponent
  ],
  imports: [
    CommonModule,
    SalifisRoutingModule
  ]
})
export class SalifisModule { }
