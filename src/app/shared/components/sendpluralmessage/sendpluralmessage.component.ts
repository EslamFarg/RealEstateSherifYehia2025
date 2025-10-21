import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchmsgComponent } from '../../ui/searchmsg/searchmsg.component';
import { TitleMsgPopupComponent } from '../../ui/title-msg-popup/title-msg-popup.component';

@Component({
  selector: 'app-sendpluralmessage',
  templateUrl: './sendpluralmessage.component.html',
  styleUrl: './sendpluralmessage.component.scss',
  standalone:true,
  imports:[NgbNavModule,FormsModule,SearchmsgComponent,TitleMsgPopupComponent]
})
export class SendpluralmessageComponent {
active = 1;
active2=1
msgDataDescription1:any='';
showPopup=false;
searchdataCheckRealtor:any=[];

showPopupRealtor=false
 cdr:ChangeDetectorRef=inject(ChangeDetectorRef)
arrDataCheck(val:any){

  this.searchdataCheckRealtor=val;


  console.log(this.searchdataCheckRealtor);

}


deleteTenant(index:any){
this.searchdataCheckRealtor.splice(index,1)
}


showMsg(val:any){
  // setTimeout(()=>{
 this.msgDataDescription1=val;
  // },0)
 this.cdr.detectChanges(); // 👈 يجبر Angular يعمل تحديث للتبويبات

  // console.log(this.msgDataDescription);
 

}

openPopupMsg(){
  this.showPopup=true
}



ngOnInit(){
  console.log(this.msgDataDescription1.length);
}

getMsgCount(){
  // if(this.msgDataDescription1){
  //   return this.msgDataDescription1.length
  // }
  if(this.msgDataDescription1.length <= 0){
    return '0';
  }
  const count=Math.ceil(this.msgDataDescription1.length / 48);
  return count
}
}
