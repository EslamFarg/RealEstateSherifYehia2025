import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../ui/toastr/services/toastr.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendmessageService } from '../../../pages/dashboard/messages/sendmessage/services/sendmessage.service';
import { NgIf } from '@angular/common';
import { FormerrorMsgComponent } from '../../ui/formerror-msg/formerror-msg.component';
import { TitleMsgPopupComponent } from '../../ui/title-msg-popup/title-msg-popup.component';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrl: './sendemail.component.scss',
  standalone:true,
  imports:[NgIf,ReactiveFormsModule,FormerrorMsgComponent,TitleMsgPopupComponent]
})
export class SendemailComponent {
toastr: ToastrService = inject(ToastrService);
  fb: FormBuilder = inject(FormBuilder);
  sendMessageServices: SendmessageService = inject(SendmessageService);
  destroyRef: DestroyRef = inject(DestroyRef);

  formEmail = this.fb.group({
    messageText: ['', [Validators.required]],
    subject: ['اهلا وسهلا بكم في برنامج العقارات'],
    useEmail: false,
    useWhatsApp: true,
    useSms: false,
    contacts: ['']
  });

  showPopup = false;
  searchdataCheckRealtor: any[] = [];
  showErrorNumber = false;
  msgDataDescription1 = '';



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Methods


  dateTimeObj = {
    date: '',
    time: ''
};

intervalId:any
ngOnInit(){
  this.updateDateTime();

  this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000); // تحديث كل ثانية
}

updateDateTime(){
  const now = new Date();
  this.dateTimeObj = {
    date: now.toLocaleDateString('en-SA'), // التاريخ
    time: now.toLocaleTimeString('en-SA', { hour12: true }) // الوقت
  };
}


  deleteTenant(index: number) {
    this.searchdataCheckRealtor.splice(index, 1);
  }

  addNumber(phoneNumber: any) {
    if (!phoneNumber.value) return;
    if (this.searchdataCheckRealtor.find(item => item.name === phoneNumber.value)) {
      this.toastr.show('هذا الرقم موجود بالفعل','error');
      phoneNumber.value = '';
      return;
    }
    this.searchdataCheckRealtor.push({ name: phoneNumber.value });
    phoneNumber.value = '';
  }

  showMsg(val: string) {
    this.msgDataDescription1 = val;
    this.formEmail.patchValue({ messageText: val });
  }

  updateMsgCount() {
    this.msgDataDescription1 = this.formEmail.controls['messageText'].value ?? '';
  }

  getMsgCount(): number {
    const text = this.formEmail.controls['messageText'].value ?? '';
    const charsPerMessage = 48;
    return Math.ceil(text.length / charsPerMessage);
  }

  onSubmit() {
    this.showErrorNumber = false;
    if (this.searchdataCheckRealtor.length <= 0) {
      this.showErrorNumber = true;
      return;
    }

    if (!this.formEmail.valid) {
      this.formEmail.markAllAsTouched();
      return;
    }

    const payload = {
      messageText: this.formEmail.controls['messageText'].value,
      subject: this.formEmail.value.subject,
      useEmail: this.formEmail.value.useEmail,
      useWhatsApp: this.formEmail.value.useWhatsApp,
      useSms: this.formEmail.value.useSms,
      contacts: this.searchdataCheckRealtor.map(item => ({ phone: item.name }))
    };

    this.sendMessageServices.sendDataMessageGroup(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res:any) => {
        this.toastr.show('تم ارسال الرساله بنجاح','success');
        this.searchdataCheckRealtor = [];
        this.formEmail.reset();
        console.log(res);
      });
  }
}
