import { Component } from '@angular/core';

@Component({
  selector: 'app-addsendmessage',
  templateUrl: './addsendmessage.component.html',
  styleUrl: './addsendmessage.component.scss'
})
export class AddsendmessageComponent {
active = 1;
active2=1
msgDataDescription:any
showPopup=false;
searchdataCheckRealtor:any=[];

showPopupRealtor=false

arrDataCheck(val:any){

  this.searchdataCheckRealtor=val;


  console.log(this.searchdataCheckRealtor);

}


deleteTenant(index:any){
this.searchdataCheckRealtor.splice(index,1)
}


showMsg(val:any){
  this.msgDataDescription=val;

}

}
