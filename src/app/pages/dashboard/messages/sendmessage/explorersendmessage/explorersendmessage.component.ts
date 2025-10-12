import { Component } from '@angular/core';

@Component({
  selector: 'app-explorersendmessage',
  templateUrl: './explorersendmessage.component.html',
  styleUrl: './explorersendmessage.component.scss'
})
export class ExplorersendmessageComponent {
dataFilter=['التاريخ','عدد المرسل اليه']


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


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}
}
