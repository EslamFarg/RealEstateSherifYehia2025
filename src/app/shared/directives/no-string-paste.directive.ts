import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoStringPaste]' ,
})
export class NoStringPasteDirective {
  constructor(private el: ElementRef) {}


  @HostListener('paste', ['$event'])
  onPasteClipboard(e: ClipboardEvent) {
    const clipBoard = e.clipboardData?.getData('text') ?? '';


    if (clipBoard.match(/[^0-9\+]+/g)) {
      e.preventDefault();
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    const pattern = /[0-9\+]/;
    const inputChar = String.fromCharCode(e.which);

    if (!pattern.test(inputChar)) {
      e.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9\+]/g, '');
  }
}
