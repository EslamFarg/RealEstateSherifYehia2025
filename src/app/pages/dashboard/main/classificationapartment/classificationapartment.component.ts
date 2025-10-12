import { Component } from '@angular/core';

@Component({
  selector: 'app-classificationapartment',
  templateUrl: './classificationapartment.component.html',
  styleUrl: './classificationapartment.component.scss'
})
export class ClassificationapartmentComponent {

  title='الرئيسيه'
  subtitle='تصنيف الوحده'


  unitCategories = [
  { id: 1, categoryName: "شقة سكنية" },
  { id: 2, categoryName: "فيلا" },
  { id: 3, categoryName: "دوبلكس" },
  { id: 4, categoryName: "استوديو" },
  { id: 5, categoryName: "مكتب إداري" },
  { id: 6, categoryName: "محل تجاري" },
  { id: 7, categoryName: "مستودع" },
  { id: 8, categoryName: "شاليه" },
  { id: 9, categoryName: "مزعة" },
  { id: 10, categoryName: "أرض فضاء" },
  { id: 11, categoryName: "برج سكني" },
  { id: 12, categoryName: "برج تجاري" },
  { id: 13, categoryName: "سكن طلاب" },
  { id: 14, categoryName: "فندق" },
  { id: 15, categoryName: "مصنع" },
  { id: 16, categoryName: "مركز تجاري" },
  { id: 17, categoryName: "مستشفى" },
  { id: 18, categoryName: "مدرسة" },
  { id: 19, categoryName: "مزرعة دواجن" },
  { id: 20, categoryName: "مزرعة أسماك" }
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
