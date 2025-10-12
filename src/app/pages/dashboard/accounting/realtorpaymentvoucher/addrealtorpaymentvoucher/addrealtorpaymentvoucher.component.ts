import { Component } from '@angular/core';

@Component({
  selector: 'app-addrealtorpaymentvoucher',
  templateUrl: './addrealtorpaymentvoucher.component.html',
  styleUrl: './addrealtorpaymentvoucher.component.scss'
})
export class AddrealtorpaymentvoucherComponent {


  

   paymentData = [
  { id: 1, contractNumber: "C-1001", property: "عمارة الورد", unit: "شقة 101", month: "يناير", amount: "4,000 ريال", paid: "3,000 ريال", tax: "600 ريال", remaining: "1,000 ريال" },
  { id: 2, contractNumber: "C-1002", property: "برج السلام", unit: "مكتب 203", month: "فبراير", amount: "5,500 ريال", paid: "5,000 ريال", tax: "750 ريال", remaining: "500 ريال" },
  { id: 3, contractNumber: "C-1003", property: "فيلا النخيل", unit: "الوحدة A1", month: "مارس", amount: "7,000 ريال", paid: "7,000 ريال", tax: "1,050 ريال", remaining: "0 ريال" },
  { id: 4, contractNumber: "C-1004", property: "عمارة الرياض", unit: "شقة 202", month: "أبريل", amount: "3,800 ريال", paid: "2,800 ريال", tax: "570 ريال", remaining: "1,000 ريال" },
  { id: 5, contractNumber: "C-1005", property: "برج الماسة", unit: "مكتب 505", month: "مايو", amount: "6,200 ريال", paid: "5,000 ريال", tax: "930 ريال", remaining: "1,200 ريال" },
  { id: 6, contractNumber: "C-1006", property: "عمارة الخليج", unit: "شقة 303", month: "يونيو", amount: "4,500 ريال", paid: "4,500 ريال", tax: "675 ريال", remaining: "0 ريال" },
  { id: 7, contractNumber: "C-1007", property: "برج اليمامة", unit: "مكتب 1101", month: "يوليو", amount: "8,000 ريال", paid: "7,000 ريال", tax: "1,200 ريال", remaining: "1,000 ريال" },
  { id: 8, contractNumber: "C-1008", property: "عمارة النور", unit: "شقة 102", month: "أغسطس", amount: "3,600 ريال", paid: "3,000 ريال", tax: "540 ريال", remaining: "600 ريال" },
  { id: 9, contractNumber: "C-1009", property: "فيلا الرفاه", unit: "الوحدة B2", month: "سبتمبر", amount: "9,000 ريال", paid: "8,500 ريال", tax: "1,350 ريال", remaining: "500 ريال" },
  { id: 10, contractNumber: "C-1010", property: "برج السحاب", unit: "مكتب 210", month: "أكتوبر", amount: "5,200 ريال", paid: "4,200 ريال", tax: "780 ريال", remaining: "1,000 ريال" },
  { id: 11, contractNumber: "C-1011", property: "عمارة النسيم", unit: "شقة 401", month: "نوفمبر", amount: "3,900 ريال", paid: "3,400 ريال", tax: "585 ريال", remaining: "500 ريال" },
  { id: 12, contractNumber: "C-1012", property: "برج الرياض", unit: "مكتب 608", month: "ديسمبر", amount: "6,800 ريال", paid: "6,000 ريال", tax: "1,020 ريال", remaining: "800 ريال" },
  { id: 13, contractNumber: "C-1013", property: "فيلا الورود", unit: "الوحدة C3", month: "يناير", amount: "7,500 ريال", paid: "6,500 ريال", tax: "1,125 ريال", remaining: "1,000 ريال" },
  { id: 14, contractNumber: "C-1014", property: "عمارة الخليج", unit: "شقة 105", month: "فبراير", amount: "4,200 ريال", paid: "3,700 ريال", tax: "630 ريال", remaining: "500 ريال" },
  { id: 15, contractNumber: "C-1015", property: "برج المملكة", unit: "مكتب 301", month: "مارس", amount: "10,000 ريال", paid: "9,000 ريال", tax: "1,500 ريال", remaining: "1,000 ريال" },
  { id: 16, contractNumber: "C-1016", property: "عمارة النخيل", unit: "شقة 206", month: "أبريل", amount: "3,500 ريال", paid: "3,000 ريال", tax: "525 ريال", remaining: "500 ريال" },
  { id: 17, contractNumber: "C-1017", property: "برج القصر", unit: "مكتب 1203", month: "مايو", amount: "6,000 ريال", paid: "5,000 ريال", tax: "900 ريال", remaining: "1,000 ريال" },
  { id: 18, contractNumber: "C-1018", property: "عمارة الزهراء", unit: "شقة 307", month: "يونيو", amount: "4,800 ريال", paid: "4,000 ريال", tax: "720 ريال", remaining: "800 ريال" },
  { id: 19, contractNumber: "C-1019", property: "برج التميز", unit: "مكتب 405", month: "يوليو", amount: "5,700 ريال", paid: "5,000 ريال", tax: "855 ريال", remaining: "700 ريال" },
  { id: 20, contractNumber: "C-1020", property: "فيلا الأفق", unit: "الوحدة D4", month: "أغسطس", amount: "8,500 ريال", paid: "8,000 ريال", tax: "1,275 ريال", remaining: "500 ريال" }
];

}
