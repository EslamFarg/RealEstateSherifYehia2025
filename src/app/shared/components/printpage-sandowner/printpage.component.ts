import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IntersectionDirective } from "../../directives/intersection.directive";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-printpage-owner',
  templateUrl: './printpage.component.html',
  styleUrl: './printpage.component.scss',
  standalone:true,
  imports: [IntersectionDirective,NgClass]
})
export class PrintpageOwnerComponent {


  @Input() isVisible=false;
  @Output() closePopup = new EventEmitter<void>();
  @Input() getDataPopup:any
  months=['','يناير','فبراير','مارس','ابريل','ماي','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر']


 totalAmountDue = 0;
 totalPaid = 0;
 totalRemaining = 0;


 ngOnChanges() {

  // reset totals
  this.totalAmountDue = 0;
  this.totalPaid = 0;
  this.totalRemaining = 0;

  if (this.getDataPopup?.listOwnerMonths) {

    this.getDataPopup.listOwnerMonths.forEach((item: any) => {

      if (item.isInThisVoucher) {
        this.totalAmountDue += item.amountDue;
        this.totalPaid += item.netPaidInThisVoucher;
        this.totalRemaining += (item.amountDue - item.netPaidInThisVoucher);
      }

    });
  }

}








// printData(){
//    this.closePopup.emit();
//   let printOpen=window.open('','_blank')
//    if (!printOpen) return;

//   //    let rowsHtml = '';

//   //     if (this.getDataPopup?.lines) {
//   //   this.getDataPopup.lines.forEach((item: any, index: number) => {
//   //     rowsHtml += `
//   //       <tr>
//   //         <td>${index + 1}</td>
//   //         <td>${item.employeeName}</td>
//   //         <td>${item.salary}</td>
//   //         <td>${item.accountName}</td>
//   //         <td>${item.absenceDays}</td>
//   //         <td>${item.loanRepayment}</td>
//   //         <td>${item.penalties}</td>
//   //         <td>${item.rewards}</td>
//   //         <td>${item.netPay}</td>
//   //       </tr>
//   //     `;
//   //   });
//   // }

//   const html=`
//   <!DOCTYPE html>
// <html lang="ar" dir="rtl">
// <head>
// <meta charset="UTF-8" />
// <title>صفحة الطباعة</title>

// <style>
//     /* إعدادات عامة */
//     body {
//         margin: 0;
//         padding: 0;
//         background: #f0f0f0;
//         font-family: Tahoma, sans-serif;
//         displey: flex;
//         align-items:center;
//         justify-content: center;
//     }

   
//     .print-page {
//        width: 297mm;      /* العرض */
//           min-height: 50mm; /* الطول */
//         background: white;
//         margin: auto;
//         padding: 15mm 20mm;
//         box-shadow: 0 0 8px rgba(0,0,0,0.2);
//         box-sizing: border-box;
//     }

//     /* الهيدر */
//     .header {
//         text-align: center;
//         border-bottom: 2px solid #000;
//         padding-bottom: 10px;
//         margin-bottom: 20px;
//     }

//     .header h1 {
//         margin: 0;
//         font-size: 24px;
//     }

//     /* معلومات أعلى الصفحة */
//     .info {
//         display: flex;
//         justify-content: space-between;
//         margin-bottom: 15px;
//         font-size: 14px;
//     }

//     /* جدول البيانات */
//     table {
//         width: 100%;
//         border-collapse: collapse;
//         margin-top: 10px;
//         font-size: 14px;
//     }

//     table th, table td {
//         border: 1px solid #000;
//         padding: 8px;
//         text-align: center;
//     }

//     table th {
//         background: #e8e8e8;
//         font-weight: bold;
//     }

//     tbody tr:nth-child(odd) {
//         background: #fafafa;
//     }

//     /* الفوتر */
//     .footer {
//         border-top: 2px solid #000;
//         text-align: center;
//         margin-top: 25px;
//         padding-top: 10px;
//         font-size: 13px;
//     }

//      .invoice-totals {
//     text-align: right;
//     margin-top: 20px;
//     font-size: 16px;

//   }

//    .invoice-totals div{
//    margin-bottom: 15px;
   
//   }

//     /* إعدادات الطباعة فقط */
//     @media print {
//         body {
//             background: none;
//         }
//         .print-page {
//             box-shadow: none;
//             margin: 0;
//             width: auto;
           
//             padding: 0;
//             min-height:100mm !important;

//         }

        
//     }
// </style>

// </head>

// <body>

// <div class="print-page">

//     <!-- هيدر الصفحة -->
//     <div class="header">
//         <h1>  تقرير طباعة خاص بصرف الرواتب</h1>
//         <p>نموذج جاهز للطباعة</p>
//     </div>

//     <!-- معلومات عامة -->
//     <div class="info">
//              <div><strong>الرقم الدفتري :</strong> ${this.getDataPopup?.bookNumber}</div>
//       <div><strong>التاريخ:</strong> ${this.getDataPopup?.advanceDate.split('T')[0]}</div>
//     </div>

//     <!-- جدول البيانات -->
//     <table>
//         <thead>
//        <tr>
//         <th>#</th>
//         <th>اسم الموظف</th>
//         <th>الصندوق / بنك</th>
//         <th>المبلغ</th>
//         <th>البيان</th>
//       </tr>
//         </thead>

//         <tbody>
//                <tr >
//         <td>1</td>
//         <td>${this.getDataPopup?.employeeName}</td>
//         <td>${this.getDataPopup?.accountName}</td>
//         <td>${this.getDataPopup?.amount}</td>
//         <td>${this.getDataPopup?.description}</td>

          
//         </tbody>
//     </table>

    
   

// </div>

// <script>
//     // فتح نافذة الطباعة تلقائياً بمجرد تحميل الصفحة
//     window.onload = () => {
//         window.print();
//     };

//      window.onafterprint = () => {
//           window.close();
//         };
// </script>

// </body>
// </html>

  
//   `
//   printOpen?.document.write(html);
//   printOpen?.print();
 

 

// }


printData() {

  this.closePopup.emit();

  let printOpen = window.open('', '_blank');
  if (!printOpen) return;

  const ownerMonthsRows = (this.getDataPopup?.listOwnerMonths || [])
    .filter((item:any) => item.isInThisVoucher)
    .map((item:any, index:any) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.contractId}</td>
            <td>${item.propertyName}</td>
            <td>${item.unitName}</td>
            <td>${this.months[item.monthIndex]}</td>
            <td>${item.amountDue}</td>
            <td>${item.netPaidInThisVoucher}</td>
            <td>${item.amountDue - item.netPaidInThisVoucher}</td>
        </tr>
    `)
    .join('');

  const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
<meta charset="UTF-8" />
<title>سند صرف للمالك</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background: #f0f0f0;
    font-family: Tahoma, sans-serif;
  }

  .print-page {
    width: 210mm;
    background: #fff;
    margin: auto;
    padding: 15mm 20mm;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    box-sizing: border-box;
  }

  .header {
    text-align: center;
    border-bottom: 2px solid #000;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .header h1 {
    margin: 0;
    font-size: 24px;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 14px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 14px;
  }

  table th, table td {
    border: 1px solid #000;
    padding: 8px;
    text-align: center;
  }

  table th {
    background: #e8e8e8;
    font-weight: bold;
  }

  hr {
    margin: 25px 0;
    border: none;
    border-bottom: 2px solid #0004;
  }

  .footer {
    text-align: center;
    margin-top: 20px;
    border-top: 2px solid #000;
    padding-top: 10px;
    font-size: 13px;
  }

  @media print {
    body {
      background: none;
    }
    .print-page {
      box-shadow: none;
      margin: 0;
      padding: 0;
      width: auto;
    }
  }
</style>

</head>

<body>

<div class="print-page">

  <div class="header">
    <h1>سند صرف خاص بالمالك</h1>
  </div>

  <!-- معلومات عامة -->
  <div class="info">
    <div><strong>الرقم الدفتري :</strong> ${this.getDataPopup?.voucherNo}</div>
    <div><strong>الصندوق / بنك :</strong> ${this.getDataPopup?.creditAccountName}</div>
    <div><strong>التاريخ :</strong> ${this.getDataPopup?.voucherDate?.split('T')[0]}</div>
  </div>

  <!-- جدول بيانات المالك -->
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>اسم المالك</th>
        <th>رقم الجوال</th>
        <th>البريد الإلكتروني</th>
        <th>رقم الهوية</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>${this.getDataPopup?.debitAccountName}</td>
        <td>${this.getDataPopup?.phoneNumber}</td>
        <td>${this.getDataPopup?.email}</td>
        <td>${this.getDataPopup?.nationalID}</td>
      </tr>
    </tbody>
  </table>

  <hr>

  <!-- جدول الشهور -->
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>رقم العقد</th>
        <th>العقار</th>
        <th>الوحدة</th>
        <th>الشهر</th>
        <th>المبلغ</th>
        <th>المدفوع</th>
        <th>المتبقي</th>
      </tr>
    </thead>

    <tbody>
      ${ownerMonthsRows || `
      <tr>
        <td colspan="8">لا يوجد بيانات</td>
      </tr>
      `}

         <tr>
        <td colspan="5">الاجمالي</td>
        <td>${this.totalAmountDue}</td>
        <td>${this.totalPaid}</td>
        <td>${this.totalRemaining}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    تم إنشاء السند بواسطة نظام الإدارة العقارية
  </div>

</div>

<script>
  window.onload = () => window.print();
  window.onafterprint = () => window.close();
</script>

</body>
</html>
`;

  printOpen.document.write(html);
  printOpen.document.close();
}



close(){
  this.closePopup.emit();
}

closePopupOverlay(e:any){
  // this.isVisible = false;
  e.stopPropagation();
  this.closePopup.emit();

}
stopClose(e:any){
  e.stopPropagation();

}




}
