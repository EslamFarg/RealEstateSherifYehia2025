import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessagesettingsService } from './services/messagesettings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-messagesettings',
  templateUrl: './messagesettings.component.html',
  styleUrl: './messagesettings.component.scss'
})
export class MessagesettingsComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!! services 

  fb:FormBuilder=inject(FormBuilder);
  _messageSettingsServices:MessagesettingsService=inject(MessagesettingsService)
  destroyRef:DestroyRef=inject(DestroyRef)
  toastr:ToastrService=inject(ToastrService)




// !!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property

active=1
btnAddandUpdate='add'
useSsl=[
  {
    name: 'true',
    value: true
  },
  {
    name: 'false',
    value: false
  }
]

FormSms=this.fb.group({
  useWhatsApp: [false],
  useEmail: [false],
  useSms: [true],
  sms : this.fb.group({
    accountSid: ['',[Validators.required]],
    authToken: ['',[Validators.required]],
    fromNumber: ['',[Validators.required]],
    baseUrl: ['',[Validators.required]],
    messagingServiceSid: ['',[Validators.required]]
  })
})


formWhatsApp=this.fb.group({
  useWhatsApp: [true],
  useEmail: [false],
  useSms: [false],
  whatsApp : this.fb.group({
    accountSid: ['',[Validators.required]],
    authToken: ['',[Validators.required]],
    fromNumber: ['',[Validators.required]],
    baseUrl: ['',[Validators.required]],
  })
})


formEmail=this.fb.group({
  useWhatsApp: [false],
  useEmail: [true],
  useSms: [false],
  email : this.fb.group({
    host: ['',[Validators.required]],
    port: ['',[Validators.required]],
    useSsl: [true,[Validators.required]],
    fromAddress: ['',[Validators.required]],
    fromName:['',[Validators.required]],
    username: ['',[Validators.required]],
    password: ['',[Validators.required]]
  })
})


// !!!!!!!!!!!!!!!!!!!!!!!!!!11 Methods
ngOnInit(){
  this.getAllDataUpdate();
}
OnSubmitSms(){

  if(this.FormSms.valid){
    let data={
  useWhatsApp: this.FormSms.value.useWhatsApp,
  useEmail: this.FormSms.value.useEmail,
  useSms: this.FormSms.value.useSms,
  sms: {
    accountSid: this.FormSms.value.sms?.accountSid,
    authToken: this.FormSms.value.sms?.authToken,
    fromNumber: this.FormSms.value.sms?.fromNumber,
    baseUrl: this.FormSms.value.sms?.baseUrl,
    messagingServiceSid: this.FormSms.value.sms?.messagingServiceSid
  }
}


this._messageSettingsServices.sendMessageSettings(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res)=>{
  // this.toastr.show('تم حفظ البيانات بنجاح','success');
  if(this.btnAddandUpdate=='add'){
  this.toastr.show('تم حفظ البيانات بنجاح','success');  
  }else{
    this.toastr.show('تم تعديل البيانات بنجاح','success');
  }
  this.btnAddandUpdate='update'
  this.getAllDataUpdate()
})



  }else{
    this.FormSms.markAllAsTouched()
  }

}


// Whats,app


OnSubmitWhatsApp(){

  if(this.formWhatsApp.valid){
    let data={
      useWhatsApp: this.formWhatsApp.value.useWhatsApp,
      useEmail: this.formWhatsApp.value.useEmail,
      useSms: this.formWhatsApp.value.useSms,
      whatsApp: {
        accountSid: this.formWhatsApp.value.whatsApp?.accountSid,
        authToken: this.formWhatsApp.value.whatsApp?.authToken,
        fromNumber: this.formWhatsApp.value.whatsApp?.fromNumber,
        baseUrl: this.formWhatsApp.value.whatsApp?.baseUrl,
      }
    }
    this._messageSettingsServices.sendMessageSettings(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res)=>{
      if(this.btnAddandUpdate == 'add'){
        this.toastr.show('تم حفظ البيانات بنجاح','success');
      }else{
        this.toastr.show('تم تعديل البيانات بنجاح','success');
      }
      this.btnAddandUpdate='update'
      this.getAllDataUpdate()
    })
  }
}



// Email

OnSubmitEmail(){
  if(this.formEmail.valid){
    let data={
      
  useWhatsApp: this.formEmail.value.useWhatsApp,
  useEmail: this.formEmail.value.useEmail,
  useSms: this.formEmail.value.useSms,
  email : {
    host: this.formEmail.value.email?.host,
    port: this.formEmail.value.email?.port,
    useSsl: this.formEmail.value.email?.useSsl,
    fromAddress: this.formEmail.value.email?.fromAddress,
    fromName:this.formEmail.value.email?.fromName,
    username: this.formEmail.value.email?.username,
    password: this.formEmail.value.email?.password
  }
// })
    }
    this._messageSettingsServices.sendMessageSettings(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res)=>{
      if(this.btnAddandUpdate == 'add'){
        this.toastr.show('تم حفظ البيانات بنجاح','success');
      }else{
        this.toastr.show('تم تعديل البيانات بنجاح','success');
      }
      this.btnAddandUpdate='update'
      this.getAllDataUpdate()
    })
    

  }else{
    this.formEmail.markAllAsTouched();
  }
}

getAllDataUpdate(){
this._messageSettingsServices.getAllDataUpdate().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  //console.log(res)
  this.FormSms.patchValue({
      useWhatsApp: res.useWhatsApp,
  useEmail: res.useEmail,
  useSms: res.useSms,
   sms: {
    accountSid: res.sms.accountSid,
    authToken: res.sms.authToken,
    fromNumber: res.sms.fromNumber,
    baseUrl: res.sms.baseUrl,
    messagingServiceSid:  res.sms.messagingServiceSid
   }
  })

  this.formWhatsApp.patchValue({
    useWhatsApp: res.useWhatsApp,
    useEmail: res.useEmail,
    useSms: res.useSms,
    whatsApp: {
      accountSid: res.whatsApp.accountSid,
      authToken: res.whatsApp.authToken,
      fromNumber: res.whatsApp.fromNumber,
      baseUrl: res.whatsApp.baseUrl,
    }
  })


  this.formEmail.patchValue({
    useWhatsApp: res.useWhatsApp,
    useEmail: res.useEmail,
    useSms: res.useSms,
    email : {
      host: res.email.host,
      port: res.email.port,
      useSsl: res.email.useSsl,
      fromAddress: res.email.fromAddress,
      fromName:res.email.fromName,
      username: res.email.username,
      password: res.email.password
    }
  })
  this.btnAddandUpdate='update'
})
}



}
