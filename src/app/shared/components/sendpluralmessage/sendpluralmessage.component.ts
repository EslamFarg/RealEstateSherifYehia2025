import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchmsgComponent } from '../../ui/searchmsg/searchmsg.component';
import { TitleMsgPopupComponent } from '../../ui/title-msg-popup/title-msg-popup.component';
import { SharedService } from '../../services/shared.service';
import { SendmessageService } from '../../../pages/dashboard/messages/sendmessage/services/sendmessage.service';
import { NgIf } from '@angular/common';
import { ToastrService } from '../../ui/toastr/services/toastr.service';


@Component({
  selector: 'app-sendpluralmessage',
  templateUrl: './sendpluralmessage.component.html',
  styleUrl: './sendpluralmessage.component.scss',
  standalone:true,
  imports: [NgbNavModule, FormsModule, SearchmsgComponent, TitleMsgPopupComponent, ReactiveFormsModule,NgIf]
})
export class SendpluralmessageComponent {
active = 1;
active2=1
msgDataDescription1:any='';
fb:FormBuilder=inject(FormBuilder)
showPopup=false;
searchdataCheckRealtor:any=[];
_sendMessageServices:SendmessageService=inject(SendmessageService)
toastr:ToastrService=inject(ToastrService);

intervalId:any

errorMsgWithMessage:any;
realtorMsgErrorMsg:any
methodMsgSend:any


sendMessageForm=this.fb.group({
  messageText: [this.msgDataDescription1 ?? '',[Validators.required]],
  subject: ['رساله جديده من برنامج العقارات'],
  useEmail: [false],
  useWhatsApp: [false],
  useSms: [true],
  contacts:['']
})


dateTimeObj = {
    date: '',
    time: ''
  };


showPopupRealtor=false
 cdr:ChangeDetectorRef=inject(ChangeDetectorRef)

arrDataCheck(val:any){

  console.log(val);
  this.searchdataCheckRealtor=val;


  // console.log(this.searchdataCheckRealtor);

}

// ngOnInit(){
// }


deleteTenant(index:any){
this.searchdataCheckRealtor.splice(index,1)
}


showMsg(val:any){
  
 this.msgDataDescription1=val;

 this.sendMessageForm.patchValue({
  messageText: this.msgDataDescription1
 })
  
 this.cdr.detectChanges(); 

  
 

}

openPopupMsg(){
  this.showPopup=true
}





ngOnInit(){

  this.updateDateTime();
  console.log(this.msgDataDescription1.length);

  this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000); // كل ثانية

  // const 

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


updateDateTime(){
  const now = new Date();
    this.dateTimeObj = {
      date: now.toLocaleDateString('en-SA'), // التاريخ
      time: now.toLocaleTimeString('en-SA', { hour12: true }) // الوقت
    };
}


onSubmit(){
  // debugger;
  if(
    this.msgDataDescription1 != '' && this.searchdataCheckRealtor.length > 0 &&
    this.sendMessageForm.value.useSms == true || this.sendMessageForm.value.useEmail == true || this.sendMessageForm.value.useWhatsApp == true
   ){

    this.methodMsgSend='';


    let data={
  messageText: this.sendMessageForm.value.messageText,
  subject: this.sendMessageForm.value.subject,
  useEmail:this.sendMessageForm.value.useEmail,
  useWhatsApp: this.sendMessageForm.value.useWhatsApp,
  useSms: this.sendMessageForm.value.useSms,
  contacts:this.searchdataCheckRealtor
    }
    // console.log("YEEEEES")
    this._sendMessageServices.sendDataMessageGroup(data).subscribe((res:any)=>{
      this.toastr.show('تم ارسال الرساله بنجاح','success');
      this.sendMessageForm.reset(
        {
          messageText: '',
          subject: '',
          useEmail: false,
          useWhatsApp: false,
          useSms: true
        }
      );
      this.searchdataCheckRealtor=[]
      // console.log(res);
    
    
    
    })



   

  }else{
    this.sendMessageForm.markAllAsTouched();
    this.errorMsgWithMessage='الرساله مطلوب'
    this.realtorMsgErrorMsg='المستاجرين مطلوب'
    // this.methodMsgSend='الرساله مطلوبه'
     if (
    !this.sendMessageForm.value.useSms &&
    !this.sendMessageForm.value.useEmail &&
    !this.sendMessageForm.value.useWhatsApp
  ) {
    this.methodMsgSend = 'يجب اختيار طريقة إرسال واحدة على الأقل';
  }
  }
}


writeMessage(e:any){
  if(e.target.value == '' && this.msgDataDescription1 == ''){
    this.errorMsgWithMessage='الرساله مطلوب';
  } 
  
  
}

requiredMsg(){
  this.errorMsgWithMessage='الرساله مطلوبه';
}



}



