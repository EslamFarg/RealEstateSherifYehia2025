import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddcontractRoutingModule } from './addcontract-routing.module';
import { AddcontractComponent } from './addcontract.component';


@NgModule({
  declarations: [
    AddcontractComponent
  ],
  imports: [
    CommonModule,
    AddcontractRoutingModule
  ]
})
export class AddcontractModule { }
