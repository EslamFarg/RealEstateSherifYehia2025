import { Component } from '@angular/core';

@Component({
  selector: 'app-explorerpaymentreceiptvoucher',
  templateUrl: './explorerpaymentreceiptvoucher.component.html',
  styleUrl: './explorerpaymentreceiptvoucher.component.scss'
})
export class ExplorerpaymentreceiptvoucherComponent {
dataFilter=["رقم السند ",'اسم المستاجر']


 receiptsData = [
  { id: 1, voucherNumber: "RV-1001", date: "2025-01-05", tenantName: "محمد أحمد", account: "إيجار شقة 101", amount: "2,500 ريال", tools: "..." },
  { id: 2, voucherNumber: "RV-1002", date: "2025-01-10", tenantName: "سارة خالد", account: "إيجار شقة 202", amount: "3,000 ريال", tools: "..." },
  { id: 3, voucherNumber: "RV-1003", date: "2025-01-15", tenantName: "أحمد علي", account: "إيجار مكتب 303", amount: "4,500 ريال", tools: "..." },
  { id: 4, voucherNumber: "RV-1004", date: "2025-01-20", tenantName: "ليلى يوسف", account: "إيجار شقة 104", amount: "2,800 ريال", tools: "..." },
  { id: 5, voucherNumber: "RV-1005", date: "2025-01-25", tenantName: "عبدالله ناصر", account: "إيجار فيلا A1", amount: "7,200 ريال", tools: "..." },
  { id: 6, voucherNumber: "RV-1006", date: "2025-02-02", tenantName: "نورة فهد", account: "إيجار شقة 203", amount: "3,300 ريال", tools: "..." },
  { id: 7, voucherNumber: "RV-1007", date: "2025-02-06", tenantName: "راشد حسن", account: "إيجار محل تجاري 1B", amount: "5,000 ريال", tools: "..." },
  { id: 8, voucherNumber: "RV-1008", date: "2025-02-10", tenantName: "فاطمة علي", account: "إيجار شقة 301", amount: "2,900 ريال", tools: "..." },
  { id: 9, voucherNumber: "RV-1009", date: "2025-02-14", tenantName: "سلمان إبراهيم", account: "إيجار مكتب 404", amount: "4,200 ريال", tools: "..." },
  { id: 10, voucherNumber: "RV-1010", date: "2025-02-18", tenantName: "ريم عبدالله", account: "إيجار شقة 105", amount: "2,700 ريال", tools: "..." },
  { id: 11, voucherNumber: "RV-1011", date: "2025-02-22", tenantName: "ماجد سعيد", account: "إيجار فيلا B2", amount: "6,500 ريال", tools: "..." },
  { id: 12, voucherNumber: "RV-1012", date: "2025-02-26", tenantName: "هدى راشد", account: "إيجار شقة 201", amount: "3,100 ريال", tools: "..." },
  { id: 13, voucherNumber: "RV-1013", date: "2025-03-02", tenantName: "عمر خالد", account: "إيجار مكتب 506", amount: "4,800 ريال", tools: "..." },
  { id: 14, voucherNumber: "RV-1014", date: "2025-03-06", tenantName: "جميلة ناصر", account: "إيجار شقة 107", amount: "2,600 ريال", tools: "..." },
  { id: 15, voucherNumber: "RV-1015", date: "2025-03-10", tenantName: "طارق حسن", account: "إيجار محل تجاري 2C", amount: "5,400 ريال", tools: "..." },
  { id: 16, voucherNumber: "RV-1016", date: "2025-03-14", tenantName: "سلوى يوسف", account: "إيجار شقة 303", amount: "3,000 ريال", tools: "..." },
  { id: 17, voucherNumber: "RV-1017", date: "2025-03-18", tenantName: "إبراهيم فهد", account: "إيجار مكتب 701", amount: "6,200 ريال", tools: "..." },
  { id: 18, voucherNumber: "RV-1018", date: "2025-03-22", tenantName: "أمينة خالد", account: "إيجار شقة 401", amount: "3,500 ريال", tools: "..." },
  { id: 19, voucherNumber: "RV-1019", date: "2025-03-26", tenantName: "ناصر عبدالعزيز", account: "إيجار فيلا C1", amount: "7,800 ريال", tools: "..." },
  { id: 20, voucherNumber: "RV-1020", date: "2025-03-30", tenantName: "ليلى إبراهيم", account: "إيجار شقة 305", amount: "2,900 ريال", tools: "..." }
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
