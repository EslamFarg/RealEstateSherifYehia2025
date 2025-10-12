import { Component } from '@angular/core';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrl: './accountstatement.component.scss'
})
export class AccountstatementComponent {


 accountStatement = [
  { id: 1, accountName: "الصندوق الرئيسي", date: "2025-01-05", description: "تحصيل إيجار شهر يناير", debit: 0, credit: 3000, total: 3000 },
  { id: 2, accountName: "الصندوق الرئيسي", date: "2025-01-10", description: "دفع مصاريف صيانة المبنى", debit: 500, credit: 0, total: 2500 },
  { id: 3, accountName: "بنك الراجحي", date: "2025-01-15", description: "إيداع إيجار مستأجر رقم 102", debit: 0, credit: 2000, total: 4500 },
  { id: 4, accountName: "بنك الراجحي", date: "2025-01-20", description: "دفع عمولة سمسار", debit: 800, credit: 0, total: 3700 },
  { id: 5, accountName: "الصندوق الرئيسي", date: "2025-01-25", description: "دفع فاتورة كهرباء", debit: 300, credit: 0, total: 3400 },
  { id: 6, accountName: "بنك الأهلي", date: "2025-01-28", description: "تحصيل إيجار فبراير", debit: 0, credit: 2500, total: 5900 },
  { id: 7, accountName: "بنك الأهلي", date: "2025-02-02", description: "سداد ضريبة عقارية", debit: 700, credit: 0, total: 5200 },
  { id: 8, accountName: "الصندوق الرئيسي", date: "2025-02-06", description: "تحصيل دفعة من مستأجر", debit: 0, credit: 3000, total: 8200 },
  { id: 9, accountName: "الصندوق الرئيسي", date: "2025-02-10", description: "دفع عمولة مكتب عقاري", debit: 1000, credit: 0, total: 7200 },
  { id: 10, accountName: "بنك البلاد", date: "2025-02-15", description: "تحصيل إيجار وحدة 205", debit: 0, credit: 2700, total: 9900 },
  { id: 11, accountName: "بنك البلاد", date: "2025-02-20", description: "مصاريف تشغيلية", debit: 400, credit: 0, total: 9500 },
  { id: 12, accountName: "الصندوق الرئيسي", date: "2025-02-25", description: "تحصيل إيجار مارس", debit: 0, credit: 3500, total: 13000 },
  { id: 13, accountName: "الصندوق الرئيسي", date: "2025-03-01", description: "رسوم بنك", debit: 50, credit: 0, total: 12950 },
  { id: 14, accountName: "بنك الراجحي", date: "2025-03-05", description: "تحصيل إيجار وحدة 307", debit: 0, credit: 3200, total: 16150 },
  { id: 15, accountName: "بنك الأهلي", date: "2025-03-10", description: "صيانة دورية للمبنى", debit: 600, credit: 0, total: 15550 },
  { id: 16, accountName: "الصندوق الرئيسي", date: "2025-03-15", description: "تحصيل إيجار مستأجر رقم 110", debit: 0, credit: 2800, total: 18350 },
  { id: 17, accountName: "الصندوق الرئيسي", date: "2025-03-20", description: "دفع عمولة سمسار", debit: 900, credit: 0, total: 17450 },
  { id: 18, accountName: "بنك الرياض", date: "2025-03-25", description: "تحصيل إيجار وحدة 411", debit: 0, credit: 3600, total: 21050 },
  { id: 19, accountName: "بنك الرياض", date: "2025-03-28", description: "دفع فاتورة مياه", debit: 450, credit: 0, total: 20600 },
  { id: 20, accountName: "الصندوق الرئيسي", date: "2025-03-31", description: "تحصيل إيجار مستأجر 112", debit: 0, credit: 2400, total: 23000 }
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
