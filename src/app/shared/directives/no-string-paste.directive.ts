import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoStringPaste]'
})
export class NoStringPasteDirective {

  constructor(private el:ElementRef) { }




  @HostListener('paste',['$event'])


  OnPasteClipboard(e:ClipboardEvent){
  
    const clipBoard=e.clipboardData?.getData('text') ?? '';

    if(clipBoard.match(/[^0-9]+/g)){
      e.preventDefault();
    }
    // if()
  
  }



    @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    const pattern = /[0-9]/; // الأرقام فقط
    const inputChar = String.fromCharCode(e.which);

    if (!pattern.test(inputChar)) {
      e.preventDefault();
    }
  }

  // 🔹 حماية إضافية: تنظيف المدخلات بعد الكتابة (لو جت حروف من لوحة مفاتيح خاصة)
  @HostListener('input', ['$event'])
  onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // يشيل أي حرف أو رمز
  }

}
