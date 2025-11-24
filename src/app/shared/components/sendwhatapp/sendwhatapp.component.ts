// import { Component, DestroyRef, inject } from '@angular/core';
// import { ToastrService } from '../../ui/toastr/services/toastr.service';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { SendmessageService } from '../../../pages/dashboard/messages/sendmessage/services/sendmessage.service';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { NgIf } from '@angular/common';
// import { TitleMsgPopupComponent } from '../../ui/title-msg-popup/title-msg-popup.component';

// @Component({
//   selector: 'app-sendwhatapp',
//   templateUrl: './sendwhatapp.component.html',
//   styleUrl: './sendwhatapp.component.scss',
//   standalone:true,
//   imports:[NgIf,TitleMsgPopupComponent,ReactiveFormsModule]

// })
// export class SendwhatappComponent {

//     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services
//     toastr:ToastrService=inject(ToastrService)
//     fb:FormBuilder=inject(FormBuilder)
//     sendMessageServices:SendmessageService=inject(SendmessageService);

//     destroyRef:DestroyRef=inject(DestroyRef)

//     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property

//     formSms=this.fb.group({
//     // phoneNumber:['',[Validators.required]],
//     messageText: ['',[Validators.required]],
//     subject: ['اهلا وسهلا بكم في برنامج العقارات'],
//     useEmail: false,
//     useWhatsApp: true,
//     useSms: false,
//     contacts:[''],
//     })

//     //  "contacts": [
//     //   {
//     //     "name": "string",
//     //     "phone": "string",
//     //     "email": "string",
//     //     "refId": 0,
//     //     "typeType": "string"
//     //   }
//     // ]

//     showPopup=false;
//   searchdataCheckRealtor:any=[];
//   showErrorNumber=false

//   msgDataDescription1:any='';
//   // msgDataDescription1:any='';

//   deleteTenant(index:any){
//   this.searchdataCheckRealtor.splice(index,1)
//   }

//   arrDataCheck(val:any){

//     this.searchdataCheckRealtor=val;

//     //console.log(this.searchdataCheckRealtor);

//   }

//   onSubmit(){

//     this.showErrorNumber=false

//     if(this.searchdataCheckRealtor.length <=0){
//       this.showErrorNumber=true
//       return;

//     }

//     const payload = {
//       messageText: this.formSms.value.messageText,
//       subject: this.formSms.value.subject,
//       useEmail: this.formSms.value.useEmail,
//       useWhatsApp: this.formSms.value.useWhatsApp,
//       useSms: this.formSms.value.useSms,
//       contacts: this.searchdataCheckRealtor.map((item: any) => ({

//         phone: item.name,      // لو الاسم هو رقم الهاتف

//       }))
//     };

//     // this
//     if(this.formSms.valid){

//       this.sendMessageServices.sendDataMessageGroup(payload).pipe((takeUntilDestroyed(this.destroyRef))).subscribe((res:any)=>{
//         this.toastr.show('تم ارسال الرساله بنجاح','success')
//         this.searchdataCheckRealtor=[];
//         this.formSms.reset();
//         //console.log(res);
//       })

//   //console.log(this.formSms.value);
//     }else{
//       this.formSms.markAllAsTouched();
//     }
//   }

//     addNumber(phoneNumber:any){

//     // if(this.searchdataCheckRealtor)

//     if(!phoneNumber.value){
//       return
//     }

//     if(this.searchdataCheckRealtor.find((item:any)=>item.name==phoneNumber.value)){
//       this.toastr.show('هذا الرقم موجود بالفعل','error');
//       phoneNumber.value='';
//       return
//     }

//     this.searchdataCheckRealtor.push({
//       name:phoneNumber.value
//     })

//     phoneNumber.value='';
//   }

//   showMsg(val:any){

//   this.msgDataDescription1=val;

//   this.formSms.patchValue({
//     messageText: this.msgDataDescription1
//   })

//   //  this.cdr.detectChanges();

//   }

//   getMsgCount(): number {
//     if (!this.msgDataDescription1 || this.msgDataDescription1.length === 0) {
//       return 0;
//     }
//     const charsPerMessage = 48; // عدد الحروف لكل رسالة SMS
//     return Math.ceil(this.msgDataDescription1.length / charsPerMessage);
//   }

//   updateMsgCount() {
//   this.msgDataDescription1 = this.formSms.value.messageText ?? '';
// }
// }

import { Component, DestroyRef, inject } from '@angular/core';
import { ToastrService } from '../../ui/toastr/services/toastr.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SendmessageService } from '../../../pages/dashboard/messages/sendmessage/services/sendmessage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { TitleMsgPopupComponent } from '../../ui/title-msg-popup/title-msg-popup.component';
import { DirectivesModule } from '../../directives/directives.module';
import { FormerrorMsgComponent } from '../../ui/formerror-msg/formerror-msg.component';
import { CountryISO, NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { PhoneNumber } from '../../../pages/dashboard/main/owner/models/phoneNumber';

@Component({
  selector: 'app-sendwhatapp',
  templateUrl: './sendwhatapp.component.html',
  styleUrl: './sendwhatapp.component.scss',
  standalone: true,
  imports: [
    NgIf,
    TitleMsgPopupComponent,
    ReactiveFormsModule,
    FormerrorMsgComponent,
    NgxIntlTelInputModule
  ],
})
export class SendwhatappComponent {
  toastr: ToastrService = inject(ToastrService);
  fb: FormBuilder = inject(FormBuilder);
  sendMessageServices: SendmessageService = inject(SendmessageService);
  destroyRef: DestroyRef = inject(DestroyRef);
  selectedCountry = CountryISO.Egypt;
  phoneControl = new FormControl<PhoneNumber | null>(null);

  formWhatsApp = this.fb.group({
    messageText: ['', [Validators.required]],
    subject: ['اهلا وسهلا بكم في برنامج العقارات'],
    useEmail: false,
    useWhatsApp: true,
    useSms: false,
    contacts: [''],
  });

  showPopup = false;
  searchdataCheckRealtor: any[] = [];
  showErrorNumber = false;
  msgDataDescription1 = '';

  deleteTenant(index: number) {
    this.searchdataCheckRealtor.splice(index, 1);
  }

   addNumber() {
    const raw = this.phoneControl.value;

    if (!raw) return;

    let formatted = '';

    if (raw.e164Number) {
      formatted = raw.e164Number; // Best format
    } else if (raw.internationalNumber) {
      formatted = raw.internationalNumber;
    } else if (raw.dialCode && raw.number) {
      formatted = `${raw.dialCode}${raw.number}`;
    }

    formatted = formatted.replace(/\s+/g, '');

    // prevent duplicates
    if (
      this.searchdataCheckRealtor.some(
        (item: { name: string }) => item.name === formatted
      )
    ) {
      this.toastr.show('هذا الرقم موجود بالفعل', 'error');
      this.phoneControl.setValue(null);
      return;
    }

    this.searchdataCheckRealtor.push({ name: formatted });

    this.phoneControl.setValue(null);
  }

  showMsg(val: string) {
    this.msgDataDescription1 = val;
    this.formWhatsApp.patchValue({ messageText: val });
  }

  updateMsgCount() {
    this.msgDataDescription1 =
      this.formWhatsApp.controls['messageText'].value ?? '';
  }

  getMsgCount(): number {
    const text = this.formWhatsApp.controls['messageText'].value ?? '';
    const charsPerMessage = 48;
    return Math.ceil(text.length / charsPerMessage);
  }

  onSubmit() {
    this.showErrorNumber = false;
    if (this.searchdataCheckRealtor.length <= 0) {
      this.showErrorNumber = true;
      return;
    }

    if (!this.formWhatsApp.valid) {
      this.formWhatsApp.markAllAsTouched();
      return;
    }

    const payload = {
      messageText: this.formWhatsApp.controls['messageText'].value,
      subject: this.formWhatsApp.value.subject,
      useEmail: this.formWhatsApp.value.useEmail,
      useWhatsApp: this.formWhatsApp.value.useWhatsApp,
      useSms: this.formWhatsApp.value.useSms,
      contacts: this.searchdataCheckRealtor.map((item) => ({
        phone: item.name,
      })),
    };

    this.sendMessageServices
      .sendDataMessageGroup(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.toastr.show('تم ارسال الرساله بنجاح', 'success');
        this.searchdataCheckRealtor = [];
        this.formWhatsApp.reset();
        //console.log(res);
      });
  }
}
