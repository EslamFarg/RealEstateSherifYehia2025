import { Component } from '@angular/core';

@Component({
  selector: 'app-explorer-salary-disbursement',
  templateUrl: './explorer-salary-disbursement.component.html',
  styleUrl: './explorer-salary-disbursement.component.scss'
})
export class ExplorerSalaryDisbursementComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property

dataFilter=["رقم السند",'التاريخ']

// pagination

pageIndex=1
pageSize=10
vouchers:any = [
  { id: 1, voucherNumber: "SD-1001", date: "2025-09-01", description: "صرف مستلزمات كهرباء", tools: "أسلاك، لمبات" },
  { id: 2, voucherNumber: "SD-1002", date: "2025-09-02", description: "شراء أدوات سباكة", tools: "مواسير، حنفية" },
  { id: 3, voucherNumber: "SD-1003", date: "2025-09-03", description: "شراء دهانات", tools: "ألوان، فرش" },
  { id: 4, voucherNumber: "SD-1004", date: "2025-09-04", description: "صيانة مكيفات", tools: "فريون، مفك" },
  { id: 5, voucherNumber: "SD-1005", date: "2025-09-05", description: "تبديل لمبات", tools: "لمبات LED" },
  { id: 6, voucherNumber: "SD-1006", date: "2025-09-06", description: "إصلاح باب خشب", tools: "مفك، مسامير" },
  { id: 7, voucherNumber: "SD-1007", date: "2025-09-07", description: "شراء مواد بناء", tools: "أسمنت، طوب" },
  { id: 8, voucherNumber: "SD-1008", date: "2025-09-08", description: "شراء معدات نظافة", tools: "مكانس، منظفات" },
  { id: 9, voucherNumber: "SD-1009", date: "2025-09-09", description: "صيانة مصعد", tools: "أسلاك، زيت" },
  { id: 10, voucherNumber: "SD-1010", date: "2025-09-10", description: "شراء أدوات نجارة", tools: "منشار، خشب" },
  { id: 11, voucherNumber: "SD-1011", date: "2025-09-11", description: "إصلاح تسريب مياه", tools: "مفتاح أنابيب" },
  { id: 12, voucherNumber: "SD-1012", date: "2025-09-12", description: "تبديل زجاج مكسور", tools: "زجاج، سيليكون" },
  { id: 13, voucherNumber: "SD-1013", date: "2025-09-13", description: "شراء معدات سلامة", tools: "طفايات، خوذ" },
  { id: 14, voucherNumber: "SD-1014", date: "2025-09-14", description: "دهان جدران", tools: "طلاء، بويات" },
  { id: 15, voucherNumber: "SD-1015", date: "2025-09-15", description: "شراء مستلزمات كهرباء", tools: "كابلات، فيش" },
  { id: 16, voucherNumber: "SD-1016", date: "2025-09-16", description: "صيانة شبكة إنترنت", tools: "سويتش، كيابل" },
  { id: 17, voucherNumber: "SD-1017", date: "2025-09-17", description: "إصلاح مقاعد", tools: "خشب، مسامير" },
  { id: 18, voucherNumber: "SD-1018", date: "2025-09-18", description: "شراء قطع غيار", tools: "مراوح، براغي" },
  { id: 19, voucherNumber: "SD-1019", date: "2025-09-19", description: "إصلاح أرضيات", tools: "بلاط، إسمنت" },
  { id: 20, voucherNumber: "SD-1020", date: "2025-09-20", description: "شراء أدوات تنظيف", tools: "منظفات، جردل" }
];






// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Method

onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}

}
