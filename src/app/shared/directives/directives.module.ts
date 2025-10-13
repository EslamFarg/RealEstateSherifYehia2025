import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoStringPasteDirective } from './no-string-paste.directive';



@NgModule({
  declarations: [NoStringPasteDirective],
  imports: [
    CommonModule
  ],
  exports:[NoStringPasteDirective]
})
export class DirectivesModule { }
