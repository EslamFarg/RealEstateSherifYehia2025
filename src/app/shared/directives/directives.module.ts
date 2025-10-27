import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoStringPasteDirective } from './no-string-paste.directive';
import { NoNumberPasteDirective } from './no-number-paste.directive';



@NgModule({
  declarations: [NoStringPasteDirective,NoNumberPasteDirective],
  imports: [
    CommonModule
  ],
  exports:[NoStringPasteDirective,NoNumberPasteDirective]
})
export class DirectivesModule { }
