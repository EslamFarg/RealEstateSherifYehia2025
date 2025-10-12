import { Component } from '@angular/core';

@Component({
  selector: 'app-messageforms',
  templateUrl: './messageforms.component.html',
  styleUrl: './messageforms.component.scss'
})
export class MessageformsComponent {


  msgData=[
  {
    name: "Ahmed",
    message: "مرحبا، كيف حالك اليوم؟"
  },
  {
    name: "Sara",
    message: "تم إرسال التقرير المطلوب."
  },
  {
    name: "Mohamed",
    message: "من فضلك راجع البيانات قبل الحفظ."
  },
  {
    name: "Noor",
    message: "تمت إضافة مستخدم جديد للنظام."
  },
  {
    name: "Ali",
    message: "سيتم تحديث النظام يوم الجمعة."
  },
    {
    name: "Sara",
    message: "تم إرسال التقرير المطلوب."
  },
  {
    name: "Mohamed",
    message: "من فضلك راجع البيانات قبل الحفظ."
  },
  {
    name: "Noor",
    message: "تمت إضافة مستخدم جديد للنظام."
  },
  {
    name: "Ali",
    message: "سيتم تحديث النظام يوم الجمعة."
  },
    {
    name: "Sara",
    message: "تم إرسال التقرير المطلوب."
  },
  {
    name: "Mohamed",
    message: "من فضلك راجع البيانات قبل الحفظ."
  },
  {
    name: "Noor",
    message: "تمت إضافة مستخدم جديد للنظام."
  },
  {
    name: "Ali",
    message: "سيتم تحديث النظام يوم الجمعة."
  }
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
