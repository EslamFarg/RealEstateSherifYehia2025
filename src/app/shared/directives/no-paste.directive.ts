import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoPaste]',
  standalone:false
})
export class NoPasteDirective {

  constructor() { }

  @HostListener('paste',['$event'])

  onPaste(e:ClipboardEvent){
    e.preventDefault();
  }

}
