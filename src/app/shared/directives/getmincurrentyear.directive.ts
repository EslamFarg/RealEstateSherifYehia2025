import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[type="date"][appGetmincurrentyear]'
})
export class GetmincurrentyearDirective {

  constructor(private el:ElementRef) { }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    const today=new Date();

    const minDate=new Date(today.getFullYear(),1,1).toISOString().split('T')[0];

    this.el.nativeElement.setAttribute('min',minDate);
  }
}
