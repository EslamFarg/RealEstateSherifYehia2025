import { Component, DestroyRef, inject } from '@angular/core';
import { SendmessageService } from '../services/sendmessage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-explorersendmessage',
  templateUrl: './explorersendmessage.component.html',
  styleUrl: './explorersendmessage.component.scss'
})
export class ExplorersendmessageComponent {
dataFilter=['التاريخ','عدد المرسل اليه']
_sendMessageServices:SendmessageService=inject(SendmessageService)
destroyRef:DestroyRef=inject(DestroyRef);

messagesData=[
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:true,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:true,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:true,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:true,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:true,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:true,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:true,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:false,
    
  },
  {
    "id": 1,
    recipients_count: 3,
    date: "2025-09-20",
    message: "تم إرسال التذكير بموعد الاجتماع.",
    smsChecked:true,
    whatsappChecked:false,
    emailChecked:true,
    
  },
  
]


  // pagination

pageIndex=1
pageSize=10


ngOnInit(){
  this.getAllListGroupMessages();
}
onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}


getAllListGroupMessages(){
  // let paramsData=new URLSearchParams({
  //   page:this.pageIndex ?? '',
  //   pageSize:this.pageSize ?? ''
  // })
  // let paramsData=new URLSearchParams({
  //   page:1,
  //   pageSize:10
  // })

  this._sendMessageServices.getAllDataMessagesListgroup(this.pageIndex,this.pageSize).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    console.log(res);
  })

}
}
