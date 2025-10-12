import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyArabic]'
})
export class OnlyArabicDirective {

  constructor(private el:ElementRef, 
   @Optional() @Self() private control?: NgControl  // ✅ كده بقى اختياري  
    // private control: NgControl
  ) { }

  private regex: RegExp = /^[\u0600-\u06FF\s]$/;

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (e.key.length === 1 && !this.regex.test(e.key)) {
      e.preventDefault();
      console.log("❌ الحروف المسموح بها فقط: عربي + مسافة");
    }
  }


   @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    const cleaned = input.value.replace(/[^\u0600-\u06FF\s]/g, '');
    if (input.value !== cleaned) {
       if (this.control && this.control.control) {
        this.control.control.setValue(cleaned, { emitEvent: true });
      } else {
        input.value = cleaned; // fallback
      }
    }
  }
}
