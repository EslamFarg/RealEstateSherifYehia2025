import { Component } from '@angular/core';

@Component({
  selector: 'app-paymentvouchernormal',
  templateUrl: './paymentvouchernormal.component.html',
  styleUrl: './paymentvouchernormal.component.scss'
})
export class PaymentvouchernormalComponent {

   receiptVouchers = [
  { id: 1, voucherNumber: "RV-2001", date: "2025-01-05", bank: "صندوق رئيسي", account: "إيجار شقة 101", amount: "2,500 ريال", tools: "..." },
  { id: 2, voucherNumber: "RV-2002", date: "2025-01-08", bank: "بنك الراجحي", account: "عمولة سمسار", amount: "1,200 ريال", tools: "..." },
  { id: 3, voucherNumber: "RV-2003", date: "2025-01-10", bank: "صندوق الفرع", account: "دفعة إيجار مكتب 203", amount: "3,000 ريال", tools: "..." },
  { id: 4, voucherNumber: "RV-2004", date: "2025-01-14", bank: "بنك الأهلي", account: "دفعة بيع عقار رقم 501", amount: "25,000 ريال", tools: "..." },
  { id: 5, voucherNumber: "RV-2005", date: "2025-01-18", bank: "صندوق رئيسي", account: "إيجار فيلا B1", amount: "6,500 ريال", tools: "..." },
  { id: 6, voucherNumber: "RV-2006", date: "2025-01-22", bank: "بنك البلاد", account: "عمولة إدارة عقار", amount: "2,000 ريال", tools: "..." },
  { id: 7, voucherNumber: "RV-2007", date: "2025-01-25", bank: "صندوق رئيسي", account: "دفعة مقدم إيجار شقة 305", amount: "4,000 ريال", tools: "..." },
  { id: 8, voucherNumber: "RV-2008", date: "2025-02-01", bank: "بنك الرياض", account: "دفعة صيانة عقار", amount: "1,800 ريال", tools: "..." },
  { id: 9, voucherNumber: "RV-2009", date: "2025-02-04", bank: "صندوق الفرع", account: "دفعة إيجار محل تجاري", amount: "3,500 ريال", tools: "..." },
  { id: 10, voucherNumber: "RV-2010", date: "2025-02-07", bank: "بنك الراجحي", account: "دفعة بيع أرض رقم 223", amount: "40,000 ريال", tools: "..." },
  { id: 11, voucherNumber: "RV-2011", date: "2025-02-10", bank: "صندوق رئيسي", account: "إيجار مكتب 402", amount: "3,200 ريال", tools: "..." },
  { id: 12, voucherNumber: "RV-2012", date: "2025-02-13", bank: "بنك الأهلي", account: "عمولة تسويق عقار", amount: "1,500 ريال", tools: "..." },
  { id: 13, voucherNumber: "RV-2013", date: "2025-02-16", bank: "صندوق رئيسي", account: "دفعة إيجار شقة 204", amount: "2,900 ريال", tools: "..." },
  { id: 14, voucherNumber: "RV-2014", date: "2025-02-19", bank: "بنك البلاد", account: "دفعة بيع شقة 707", amount: "18,000 ريال", tools: "..." },
  { id: 15, voucherNumber: "RV-2015", date: "2025-02-22", bank: "صندوق الفرع", account: "إيجار فيلا A2", amount: "7,000 ريال", tools: "..." },
  { id: 16, voucherNumber: "RV-2016", date: "2025-02-25", bank: "بنك الرياض", account: "دفعة صيانة كهرباء", amount: "900 ريال", tools: "..." },
  { id: 17, voucherNumber: "RV-2017", date: "2025-02-28", bank: "صندوق رئيسي", account: "دفعة مقدم بيع أرض", amount: "35,000 ريال", tools: "..." },
  { id: 18, voucherNumber: "RV-2018", date: "2025-03-02", bank: "بنك الأهلي", account: "دفعة إيجار سنوي", amount: "9,600 ريال", tools: "..." },
  { id: 19, voucherNumber: "RV-2019", date: "2025-03-05", bank: "صندوق الفرع", account: "دفعة إيجار مكتب 509", amount: "3,800 ريال", tools: "..." },
  { id: 20, voucherNumber: "RV-2020", date: "2025-03-08", bank: "بنك الراجحي", account: "دفعة بيع فيلا D4", amount: "55,000 ريال", tools: "..." }
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
