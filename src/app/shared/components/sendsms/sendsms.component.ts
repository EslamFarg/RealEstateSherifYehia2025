  import { Component, DestroyRef, inject } from '@angular/core';
  import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { ToastrService } from '../../ui/toastr/services/toastr.service';
  import { TitleMsgPopupComponent } from '../../ui/title-msg-popup/title-msg-popup.component';
  import { DirectivesModule } from "../../directives/directives.module";
  import { FormerrorMsgComponent } from '../../ui/formerror-msg/formerror-msg.component';
  import { NgbScrollSpyFragment } from "../../../../../node_modules/@ng-bootstrap/ng-bootstrap/scrollspy/scrollspy";
  import { NgIf } from '@angular/common';
  import { SendmessageService } from '../../../pages/dashboard/messages/sendmessage/services/sendmessage.service';
  import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

  @Component({
    selector: 'app-sendsms',
    templateUrl: './sendsms.component.html',
    styleUrl: './sendsms.component.scss',
    standalone:true,
    imports: [FormsModule, TitleMsgPopupComponent, DirectivesModule, FormerrorMsgComponent, ReactiveFormsModule,NgIf]
  })
  export class SendsmsComponent {

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services
    toastr:ToastrService=inject(ToastrService)
    fb:FormBuilder=inject(FormBuilder)
    sendMessageServices:SendmessageService=inject(SendmessageService);

    destroyRef:DestroyRef=inject(DestroyRef)
    
    

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property


    formSms=this.fb.group({
    // phoneNumber:['',[Validators.required]],
    messageText: ['',[Validators.required]],
    subject: ['اهلا وسهلا بكم في برنامج العقارات'],
    useEmail: false,
    useWhatsApp: false,
    useSms: true,
    contacts:[''],
    })

    //  "contacts": [
    //   {
    //     "name": "string",
    //     "phone": "string",
    //     "email": "string",
    //     "refId": 0,
    //     "typeType": "string"
    //   }
    // ]


    showPopup=false;
  searchdataCheckRealtor:any=[];
  showErrorNumber=false

  msgDataDescription1:any='';
  // msgDataDescription1:any='';

  deleteTenant(index:any){
  this.searchdataCheckRealtor.splice(index,1)
  }

  arrDataCheck(val:any){

    this.searchdataCheckRealtor=val;


    console.log(this.searchdataCheckRealtor);

  }



  onSubmit(){


    // debugger;
    this.showErrorNumber=false
  
    if(this.searchdataCheckRealtor.length <=0){
      this.showErrorNumber=true
      return;

    }

    const payload = {
      messageText: this.formSms.value.messageText,
      subject: this.formSms.value.subject,
      useEmail: this.formSms.value.useEmail,
      useWhatsApp: this.formSms.value.useWhatsApp,
      useSms: this.formSms.value.useSms,
      contacts: this.searchdataCheckRealtor.map((item: any) => ({
        
        phone: item.name,      // لو الاسم هو رقم الهاتف
    
      }))
    };

    // this
    if(this.formSms.valid){





      this.sendMessageServices.sendDataMessageGroup(payload).pipe((takeUntilDestroyed(this.destroyRef))).subscribe((res:any)=>{
        this.toastr.show('تم ارسال الرساله بنجاح','success')
        this.searchdataCheckRealtor=[];
        this.formSms.reset();
        console.log(res);
      })

  console.log(this.formSms.value);    
    }else{
      this.formSms.markAllAsTouched();
    }
  }

    addNumber(phoneNumber:any){


    // if(this.searchdataCheckRealtor)

    if(!phoneNumber.value){
      return
    }


    if(this.searchdataCheckRealtor.find((item:any)=>item.name==phoneNumber.value)){
      this.toastr.show('هذا الرقم موجود بالفعل','error');
      phoneNumber.value='';
      return
    }


    this.searchdataCheckRealtor.push({
      name:phoneNumber.value
    })

    phoneNumber.value='';
  }


  showMsg(val:any){
    
  this.msgDataDescription1=val;

  this.formSms.patchValue({
    messageText: this.msgDataDescription1
  })
    
  //  this.cdr.detectChanges();  

  }

  getMsgCount(): number {
    if (!this.msgDataDescription1 || this.msgDataDescription1.length === 0) {
      return 0;
    }
    const charsPerMessage = 48; // عدد الحروف لكل رسالة SMS
    return Math.ceil(this.msgDataDescription1.length / charsPerMessage);
  }


  updateMsgCount() {
  this.msgDataDescription1 = this.formSms.value.messageText ?? '';
}
  }
