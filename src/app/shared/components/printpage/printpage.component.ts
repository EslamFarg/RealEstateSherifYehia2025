import { Component } from '@angular/core';

@Component({
  selector: 'app-printpage',
  templateUrl: './printpage.component.html',
  styleUrl: './printpage.component.scss',
  standalone:true
})
export class PrintpageComponent {

voucherPrintData = {
  voucherNo: "PV-2025-0012",
  voucherDate: "2025-01-15",
  ownerName: "أحمد محمد السبيعي",
  nationalId: "1020304050",

  paymentData: [
    {
      propertyName: "عمارة النخيل",
      monthName: "يناير",
      amountDue: 2500,
      paidAmount: 2000,
      remainingAmount: 500
    },
    {
      propertyName: "برج الندى",
      monthName: "فبراير",
      amountDue: 3000,
      paidAmount: 1500,
      remainingAmount: 1500
    },
    {
      propertyName: "مجمع الياسمين",
      monthName: "مارس",
      amountDue: 2800,
      paidAmount: 2800,
      remainingAmount: 0
    }
  ],

  TotalAmountDue: 8300,
  PaidTotalAmount: 6300,
  RemainingTotalAmount: 2000
};



  print() {
  const printContent = document.getElementById('print-area')!.innerHTML;
  const WindowPrt = window.open('', '', 'width=1000,height=900');

  WindowPrt!.document.write(`
    <html>
      <head>
        <title>طباعة السند</title>
        <style>
          body { font-family: "Tajawal", sans-serif; direction: rtl; padding: 20px; }
        </style>
      </head>
      <body>${printContent}</body>
    </html>
  `);

  WindowPrt!.document.close();
  WindowPrt!.print();
}

}
