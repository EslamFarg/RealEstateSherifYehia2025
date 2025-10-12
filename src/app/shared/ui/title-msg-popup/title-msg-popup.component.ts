import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-title-msg-popup',
  templateUrl: './title-msg-popup.component.html',
  styleUrl: './title-msg-popup.component.scss',
  standalone:true,
  imports:[NgClass]
})
export class TitleMsgPopupComponent {
@Input() showPopup:any;

msgData=[
  {
    title:'رساله1',
    text:'"1111هذه رسالة رقم 2، وهي رسالة طويلة تحتوي على تفاصيل أكثر من سابقتها. الهدف منها أن تكون نموذجًا أو مثالًا على رسالة أكبر حجمًا، بحيث يمكن استخدامها في الاختبار أو العرض أو أي غرض آخر. تحتوي هذه الرسالة على عدة جمل مترابطة ومتتالية لتعطي شعورًا بأنها نص متكامل وليست مجرد جملة قصيرة."',
  },
  {
    title:'رساله 2',
    // text:'هذه رساله رقم 2',
        text:'"2222هذه رسالة رقم 2، وهي رسالة طويلة تحتوي على تفاصيل أكثر من سابقتها. الهدف منها أن تكون نموذجًا أو مثالًا على رسالة أكبر حجمًا، بحيث يمكن استخدامها في الاختبار أو العرض أو أي غرض آخر. تحتوي هذه الرسالة على عدة جمل مترابطة ومتتالية لتعطي شعورًا بأنها نص متكامل وليست مجرد جملة قصيرة."',
  },
]


msgDataSelect:any
@Output() msgDataDescription = new EventEmitter<any>();



selectMsg(msg:any){
  this.msgDataSelect=msg
}


chooseMsg(){
  this.msgDataDescription.emit(this.msgDataSelect)
  console.log(this.msgDataDescription)
  this.showPopup=!this.showPopup
}



}
