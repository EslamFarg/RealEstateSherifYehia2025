import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoStringPasteDirective } from './no-string-paste.directive';
import { NoNumberPasteDirective } from './no-number-paste.directive';
import { PhoneValidatorDirective } from './validationnumber14.directive';



@NgModule({
  declarations: [NoStringPasteDirective,NoNumberPasteDirective],
  imports: [
    CommonModule
  ],
  exports:[NoStringPasteDirective,NoNumberPasteDirective]
})
export class DirectivesModule { }
