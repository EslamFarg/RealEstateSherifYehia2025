import { Component } from '@angular/core';

@Component({
  selector: 'app-addapartment',
  templateUrl: './addapartment.component.html',
  styleUrl: './addapartment.component.scss'
})
export class AddapartmentComponent {

  title='الرئيسيه'
  subtitle='الوحده'



  refreshPage(){
    location.reload();
  }

}
