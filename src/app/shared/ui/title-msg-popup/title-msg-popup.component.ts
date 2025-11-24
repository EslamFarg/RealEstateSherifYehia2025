import { NgClass } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { MessageformsService } from '../../../pages/dashboard/messages/messageforms/services/messageforms.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-title-msg-popup',
  templateUrl: './title-msg-popup.component.html',
  styleUrl: './title-msg-popup.component.scss',
  standalone:true,
  imports:[NgClass]
})
export class TitleMsgPopupComponent {
@Input() showPopup:any=false;
@Output() showPopupChange =new EventEmitter()
destroyRef:DestroyRef=inject(DestroyRef);
_msgServices:MessageformsService=inject(MessageformsService)
msgArrayData:any=[
  

]


msgDataSelect:any
@Output() msgDataDescription = new EventEmitter<any>();

ngOnInit(){
  this.getAllDataMsg();
}

selectMsg(msg:any){
  this.msgDataSelect=msg.body
}


chooseMsg(){


 this.msgDataDescription.emit(this.msgDataSelect)    
  
 this.showPopupChange.emit(false);
 
  // this.showPopup=!this.showPopup
  // this.showPop
}
getAllDataMsg(){
  this._msgServices.getAllDataMessageForms(0,0).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    // //console.log(res);
    this.msgArrayData=res.items;
  })
}


closePopup(){
  this.showPopupChange.emit(false);
}

}
