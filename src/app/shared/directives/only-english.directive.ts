import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyEnglish]'
})
export class OnlyEnglishDirective {

  constructor(private el:ElementRef,private control:NgControl) { }


  private regex=/^[a-zA-Z\s]$/



  @HostListener('keydown',['$event'])

  onKeyDown(event:KeyboardEvent){
    if(event.key.length == 1 && !this.regex.test(event.key)){
      event.preventDefault();
    }
  }

  @HostListener('input',['$event'])

  onChangeValue(e:any){
      const input = (e.target as HTMLInputElement).value;
       const cleaned = input.replace(/[^A-Za-z\s]/g, ''); // مثال للإنجليزي
    if(input != cleaned){
         this.control.control?.setValue(cleaned, { emitEvent: true });
      e.preventDefault();
    }
  }
}
