import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsandconditionsRoutingModule } from './termsandconditions-routing.module';
import { TermsandconditionsComponent } from './termsandconditions.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({ 
  declarations: [
    TermsandconditionsComponent
  ],
  imports: [
    CommonModule,
    TermsandconditionsRoutingModule,
    ReactiveFormsModule
  ]
})
export class TermsandconditionsModule { }
