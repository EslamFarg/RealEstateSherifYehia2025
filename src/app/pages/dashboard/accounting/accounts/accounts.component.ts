import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent {


  typeAccount=[
    {
      id:0,
      name:'صندوق'
    },
    {
      id:0,
      name:'بنك'
    },
    {
      id:0,
      name:'ايردات'
    },
    {
      id:0,
      name:'مصروفات'
    },
  ]



   accountsData = [
  { id: 1, accountName: "الصندوق الرئيسي", accountType: "نقدي", accountNumber: "1001", iban: "SA1234567890123456789011", tools: "..." },
  { id: 2, accountName: "صندوق الفرع - جدة", accountType: "نقدي", accountNumber: "1002", iban: "SA2234567890123456789012", tools: "..." },
  { id: 3, accountName: "بنك الراجحي", accountType: "بنك", accountNumber: "2001", iban: "SA3334567890123456789013", tools: "..." },
  { id: 4, accountName: "بنك الأهلي", accountType: "بنك", accountNumber: "2002", iban: "SA4434567890123456789014", tools: "..." },
  { id: 5, accountName: "بنك البلاد", accountType: "بنك", accountNumber: "2003", iban: "SA5534567890123456789015", tools: "..." },
  { id: 6, accountName: "إيرادات الإيجارات", accountType: "إيرادات", accountNumber: "3001", iban: "SA6634567890123456789016", tools: "..." },
  { id: 7, accountName: "إيرادات العمولات", accountType: "إيرادات", accountNumber: "3002", iban: "SA7734567890123456789017", tools: "..." },
  { id: 8, accountName: "مصاريف الصيانة", accountType: "مصروف", accountNumber: "4001", iban: "SA8834567890123456789018", tools: "..." },
  { id: 9, accountName: "مصاريف التشغيل", accountType: "مصروف", accountNumber: "4002", iban: "SA9934567890123456789019", tools: "..." },
  { id: 10, accountName: "الضرائب والزكاة", accountType: "التزامات", accountNumber: "5001", iban: "SA1034567890123456789020", tools: "..." },
  { id: 11, accountName: "العملاء", accountType: "أصول", accountNumber: "6001", iban: "SA1134567890123456789021", tools: "..." },
  { id: 12, accountName: "الملاك", accountType: "التزامات", accountNumber: "7001", iban: "SA1234567890123456789022", tools: "..." },
  { id: 13, accountName: "حساب الصيانة المشتركة", accountType: "أصول", accountNumber: "8001", iban: "SA1334567890123456789023", tools: "..." },
  { id: 14, accountName: "ودائع المستأجرين", accountType: "التزامات", accountNumber: "9001", iban: "SA1434567890123456789024", tools: "..." },
  { id: 15, accountName: "بنك الرياض", accountType: "بنك", accountNumber: "2004", iban: "SA1534567890123456789025", tools: "..." },
  { id: 16, accountName: "حساب الطوارئ", accountType: "احتياطي", accountNumber: "1003", iban: "SA1634567890123456789026", tools: "..." },
  { id: 17, accountName: "إيرادات بيع العقارات", accountType: "إيرادات", accountNumber: "3003", iban: "SA1734567890123456789027", tools: "..." },
  { id: 18, accountName: "مصاريف الكهرباء والمياه", accountType: "مصروف", accountNumber: "4003", iban: "SA1834567890123456789028", tools: "..." },
  { id: 19, accountName: "مصاريف التسويق", accountType: "مصروف", accountNumber: "4004", iban: "SA1934567890123456789029", tools: "..." },
  { id: 20, accountName: "حساب الرواتب", accountType: "التزامات", accountNumber: "5002", iban: "SA2034567890123456789030", tools: "..." }
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
