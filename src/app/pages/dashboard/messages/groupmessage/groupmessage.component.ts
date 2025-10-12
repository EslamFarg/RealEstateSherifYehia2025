import { Component } from '@angular/core';

@Component({
  selector: 'app-groupmessage',
  templateUrl: './groupmessage.component.html',
  styleUrl: './groupmessage.component.scss'
})
export class GroupmessageComponent {

  dataFilter=['اسم الراسل','المرسل اليه']

  
 messagesData = [
  { id: 1, sender: "النظام", receiver: "جميع المستأجرين", date: "2025-01-05", message: "تم إصدار فواتير الإيجار لشهر يناير.", smsChecked: true, whatsappChecked: false, emailChecked: true },
  { id: 2, sender: "أحمد السالم", receiver: "محمد العتيبي", date: "2025-01-06", message: "تم استلام الدفعة الأولى من عقد الإيجار.", smsChecked: true, whatsappChecked: true, emailChecked: false },
  { id: 3, sender: "النظام", receiver: "قسم المحاسبة", date: "2025-01-07", message: "يرجى مراجعة فواتير الملاك.", smsChecked: false, whatsappChecked: false, emailChecked: true },
  { id: 4, sender: "منى العبدالله", receiver: "سارة المطيري", date: "2025-01-08", message: "تم تحديث بيانات المستأجر.", smsChecked: false, whatsappChecked: true, emailChecked: true },
  { id: 5, sender: "النظام", receiver: "خالد الشريف", date: "2025-01-10", message: "تنبيه: تأخر في سداد الإيجار.", smsChecked: true, whatsappChecked: true, emailChecked: false },
  { id: 6, sender: "فريق الصيانة", receiver: "المستأجرين في برج الرياض", date: "2025-01-11", message: "سيتم قطع الكهرباء للصيانة المؤقتة غدًا.", smsChecked: true, whatsappChecked: false, emailChecked: true },
  { id: 7, sender: "النظام", receiver: "المالك فهد العتيبي", date: "2025-01-12", message: "تم تحويل إيراد الإيجار إلى حسابك.", smsChecked: false, whatsappChecked: true, emailChecked: true },
  { id: 8, sender: "أحمد السالم", receiver: "نورة الشهري", date: "2025-01-13", message: "يرجى تزويدنا بنسخة من العقد المحدث.", smsChecked: true, whatsappChecked: false, emailChecked: false },
  { id: 9, sender: "النظام", receiver: "جميع الملاك", date: "2025-01-15", message: "تقرير الإيرادات الشهري جاهز للعرض.", smsChecked: false, whatsappChecked: false, emailChecked: true },
  { id: 10, sender: "منى العبدالله", receiver: "إدارة الصيانة", date: "2025-01-17", message: "تم تسجيل طلب صيانة جديد.", smsChecked: true, whatsappChecked: true, emailChecked: true },
  { id: 11, sender: "النظام", receiver: "قسم المالية", date: "2025-01-20", message: "تذكير: إغلاق الدفعات الشهرية اليوم.", smsChecked: true, whatsappChecked: false, emailChecked: true },
  { id: 12, sender: "فريق الدعم", receiver: "جميع المستخدمين", date: "2025-01-22", message: "تم تحديث النظام إلى الإصدار 2.1.", smsChecked: false, whatsappChecked: true, emailChecked: true },
  { id: 13, sender: "النظام", receiver: "المستأجر عبدالعزيز", date: "2025-01-23", message: "تم تأكيد استلام دفعتك بنجاح.", smsChecked: true, whatsappChecked: true, emailChecked: false },
  { id: 14, sender: "النظام", receiver: "جميع المستأجرين", date: "2025-01-25", message: "تنويه: سيتم إرسال إشعارات التجديد قريبًا.", smsChecked: true, whatsappChecked: false, emailChecked: true },
  { id: 15, sender: "أحمد السالم", receiver: "سارة المطيري", date: "2025-01-26", message: "تمت الموافقة على طلبك.", smsChecked: false, whatsappChecked: true, emailChecked: true },
  { id: 16, sender: "النظام", receiver: "إدارة العقارات", date: "2025-01-27", message: "تقرير الأداء متاح الآن.", smsChecked: false, whatsappChecked: false, emailChecked: true },
  { id: 17, sender: "منى العبدالله", receiver: "خالد الشريف", date: "2025-01-28", message: "يرجى تأكيد استلام المستندات.", smsChecked: true, whatsappChecked: false, emailChecked: false },
  { id: 18, sender: "النظام", receiver: "قسم الصيانة", date: "2025-01-29", message: "تم تعيين مهمة جديدة للفريق.", smsChecked: false, whatsappChecked: true, emailChecked: true },
  { id: 19, sender: "النظام", receiver: "المستأجرين في جدة", date: "2025-01-30", message: "سيتم إرسال فواتير فبراير قريبًا.", smsChecked: true, whatsappChecked: true, emailChecked: false },
  { id: 20, sender: "فريق الإدارة", receiver: "جميع الأقسام", date: "2025-02-01", message: "يرجى الالتزام بإدخال البيانات قبل نهاية الأسبوع.", smsChecked: false, whatsappChecked: true, emailChecked: true }
];


  // pagination

pageIndex=1
pageSize=10


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}
}
