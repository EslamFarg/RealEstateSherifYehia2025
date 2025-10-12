import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoNumberPaste]'
})
export class NoNumberPasteDirective {

  constructor(private el:ElementRef) { }




  @HostListener('paste', ['$event'])
  
  onPasteClipboard(e:ClipboardEvent) {
    const clipBoard=e.clipboardData?.getData('text') ?? '';
    if(clipBoard.match(/[0-9]+/g)){
    e.preventDefault();
  }
}



@HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // السماح بالمفاتيح الخاصة (Backspace, Tab, Arrow keys, Delete)
    if (
      e.key === 'Backspace' ||
      e.key === 'Tab' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'Delete'
    ) {
      return;
    }

    // لو المفتاح رقم → امنعه
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  }

   @HostListener('input', ['$event'])
  onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[0-9]/g, ''); // يشيل أي رقم اتكتب
  }

}
