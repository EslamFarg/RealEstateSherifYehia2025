import { Component } from '@angular/core';

@Component({
  selector: 'app-explorerpaymentvoucher',
  templateUrl: './explorerpaymentvoucher.component.html',
  styleUrl: './explorerpaymentvoucher.component.scss'
})
export class ExplorerpaymentvoucherComponent {


  dataFilter=['رقم السند','اسم المالك']

   vouchersData = [
  { id: 1, voucherNumber: "PV-1001", ownerName: "محمد علي", account: "حساب جاري", contract: "عقد رقم 501", totalAmount: "2,500 ريال", tools: "..." },
  { id: 2, voucherNumber: "PV-1002", ownerName: "سارة حسن", account: "حساب توفير", contract: "عقد رقم 502", totalAmount: "3,000 ريال", tools: "..." },
  { id: 3, voucherNumber: "PV-1003", ownerName: "أحمد إبراهيم", account: "حساب جاري", contract: "عقد رقم 503", totalAmount: "1,800 ريال", tools: "..." },
  { id: 4, voucherNumber: "PV-1004", ownerName: "فاطمة يوسف", account: "حساب توفير", contract: "عقد رقم 504", totalAmount: "2,100 ريال", tools: "..." },
  { id: 5, voucherNumber: "PV-1005", ownerName: "عبدالله سعيد", account: "حساب جاري", contract: "عقد رقم 505", totalAmount: "4,500 ريال", tools: "..." },
  { id: 6, voucherNumber: "PV-1006", ownerName: "نورة محمد", account: "حساب استثماري", contract: "عقد رقم 506", totalAmount: "6,000 ريال", tools: "..." },
  { id: 7, voucherNumber: "PV-1007", ownerName: "علي خالد", account: "حساب جاري", contract: "عقد رقم 507", totalAmount: "2,750 ريال", tools: "..." },
  { id: 8, voucherNumber: "PV-1008", ownerName: "ريم عبدالله", account: "حساب توفير", contract: "عقد رقم 508", totalAmount: "1,950 ريال", tools: "..." },
  { id: 9, voucherNumber: "PV-1009", ownerName: "سلمان ناصر", account: "حساب جاري", contract: "عقد رقم 509", totalAmount: "3,400 ريال", tools: "..." },
  { id: 10, voucherNumber: "PV-1010", ownerName: "هدى فهد", account: "حساب استثماري", contract: "عقد رقم 510", totalAmount: "5,200 ريال", tools: "..." },
  { id: 11, voucherNumber: "PV-1011", ownerName: "راشد عبدالله", account: "حساب جاري", contract: "عقد رقم 511", totalAmount: "2,850 ريال", tools: "..." },
  { id: 12, voucherNumber: "PV-1012", ownerName: "منى خالد", account: "حساب توفير", contract: "عقد رقم 512", totalAmount: "3,100 ريال", tools: "..." },
  { id: 13, voucherNumber: "PV-1013", ownerName: "عادل حسن", account: "حساب جاري", contract: "عقد رقم 513", totalAmount: "4,000 ريال", tools: "..." },
  { id: 14, voucherNumber: "PV-1014", ownerName: "جميلة ناصر", account: "حساب توفير", contract: "عقد رقم 514", totalAmount: "2,200 ريال", tools: "..." },
  { id: 15, voucherNumber: "PV-1015", ownerName: "عبدالرحمن فهد", account: "حساب جاري", contract: "عقد رقم 515", totalAmount: "5,500 ريال", tools: "..." },
  { id: 16, voucherNumber: "PV-1016", ownerName: "أمينة سعيد", account: "حساب استثماري", contract: "عقد رقم 516", totalAmount: "7,000 ريال", tools: "..." },
  { id: 17, voucherNumber: "PV-1017", ownerName: "ناصر محمد", account: "حساب جاري", contract: "عقد رقم 517", totalAmount: "3,600 ريال", tools: "..." },
  { id: 18, voucherNumber: "PV-1018", ownerName: "سلوى علي", account: "حساب توفير", contract: "عقد رقم 518", totalAmount: "1,700 ريال", tools: "..." },
  { id: 19, voucherNumber: "PV-1019", ownerName: "طارق حسن", account: "حساب جاري", contract: "عقد رقم 519", totalAmount: "2,900 ريال", tools: "..." },
  { id: 20, voucherNumber: "PV-1020", ownerName: "ليلى إبراهيم", account: "حساب استثماري", contract: "عقد رقم 520", totalAmount: "6,500 ريال", tools: "..." }
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
