import { Component } from '@angular/core';

@Component({
  selector: 'app-explorersalifs',
  templateUrl: './explorersalifs.component.html',
  styleUrl: './explorersalifs.component.scss'
})
export class ExplorersalifsComponent {


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property
  dataFilter=['التاريخ','اسم الموظف']

   salifs = [
  {
    id: 1,
    voucherNumber: "SD-1001",
    date: "2025-09-01",
    employee: "أحمد علي",
    amount: 1500,
    account: "صندوق رئيسي",
    tools: "إيصال صرف"
  },
  {
    id: 2,
    voucherNumber: "SD-1002",
    date: "2025-09-02",
    employee: "محمد حسن",
    amount: 2000,
    account: "بنك الراجحي",
    tools: "شيك"
  },
  {
    id: 3,
    voucherNumber: "SD-1003",
    date: "2025-09-03",
    employee: "محمود إبراهيم",
    amount: 1200,
    account: "صندوق فرعي",
    tools: "إيصال استلام"
  },
  {
    id: 4,
    voucherNumber: "SD-1004",
    date: "2025-09-04",
    employee: "خالد محمود",
    amount: 2500,
    account: "بنك الأهلي",
    tools: "تحويل بنكي"
  },
  {
    id: 5,
    voucherNumber: "SD-1005",
    date: "2025-09-05",
    employee: "سعيد أحمد",
    amount: 1800,
    account: "صندوق رئيسي",
    tools: "إيصال صرف"
  },
  {
    id: 6,
    voucherNumber: "SD-1006",
    date: "2025-09-06",
    employee: "يوسف علي",
    amount: 3000,
    account: "بنك الرياض",
    tools: "شيك"
  },
  {
    id: 7,
    voucherNumber: "SD-1007",
    date: "2025-09-07",
    employee: "مروان طارق",
    amount: 2200,
    account: "صندوق فرعي",
    tools: "إيصال استلام"
  },
  {
    id: 8,
    voucherNumber: "SD-1008",
    date: "2025-09-08",
    employee: "زياد عادل",
    amount: 1700,
    account: "صندوق رئيسي",
    tools: "إيصال صرف"
  },
  {
    id: 9,
    voucherNumber: "SD-1009",
    date: "2025-09-09",
    employee: "رامي حسن",
    amount: 2800,
    account: "بنك الراجحي",
    tools: "تحويل بنكي"
  },
  {
    id: 10,
    voucherNumber: "SD-1010",
    date: "2025-09-10",
    employee: "وليد عبد الله",
    amount: 3500,
    account: "بنك الأهلي",
    tools: "شيك"
  },
  {
    id: 8,
    voucherNumber: "SD-1008",
    date: "2025-09-08",
    employee: "زياد عادل",
    amount: 1700,
    account: "صندوق رئيسي",
    tools: "إيصال صرف"
  },
  {
    id: 9,
    voucherNumber: "SD-1009",
    date: "2025-09-09",
    employee: "رامي حسن",
    amount: 2800,
    account: "بنك الراجحي",
    tools: "تحويل بنكي"
  },
  {
    id: 10,
    voucherNumber: "SD-1010",
    date: "2025-09-10",
    employee: "وليد عبد الله",
    amount: 3500,
    account: "بنك الأهلي",
    tools: "شيك"
  },
  {
    id: 8,
    voucherNumber: "SD-1008",
    date: "2025-09-08",
    employee: "زياد عادل",
    amount: 1700,
    account: "صندوق رئيسي",
    tools: "إيصال صرف"
  },
  {
    id: 9,
    voucherNumber: "SD-1009",
    date: "2025-09-09",
    employee: "رامي حسن",
    amount: 2800,
    account: "بنك الراجحي",
    tools: "تحويل بنكي"
  },
  {
    id: 10,
    voucherNumber: "SD-1010",
    date: "2025-09-10",
    employee: "وليد عبد الله",
    amount: 3500,
    account: "بنك الأهلي",
    tools: "شيك"
  }
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
