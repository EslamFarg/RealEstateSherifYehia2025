import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IntersectionDirective } from "../../directives/intersection.directive";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-printpage-maintenance',
  templateUrl: './printpage.component.html',
  styleUrl: './printpage.component.scss',
  standalone:true,
  imports: [IntersectionDirective,NgClass]
})
export class PrintpageMaintenanceComponent {


  @Input() isVisible=false;
  @Output() closePopup = new EventEmitter<void>();
  @Input() getDataPopup:any


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


  // window.onafterprint = function () {
  //       window.close(); // يقفل التاب (لو كانت مفتوحة من كود)
  //   };






//   print() {
//   const printContent = document.getElementById('print-area')!.innerHTML;
//   const WindowPrt = window.open('', '', 'width=1000,height=900');

//   WindowPrt!.document.write(`
//     <html>
//       <head>
//         <title>طباعة السند</title>
//         <style>
//           body { font-family: "Tajawal", sans-serif; direction: rtl; padding: 20px; }
//         </style>
//       </head>
//       <body>${printContent}</body>
//     </html>
//   `);

//   WindowPrt!.document.close();
//   WindowPrt!.print();
// }


// printInvoice(){
//   let  open=window.open(' ','_blank');
// }

printData(){
   this.closePopup.emit();
  let printOpen=window.open('','_blank')
   if (!printOpen) return;

  const html=`
  <!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<title>صفحة الطباعة</title>

<style>
    /* إعدادات عامة */
    body {
        margin: 0;
        padding: 0;
        background: #f0f0f0;
        font-family: Tahoma, sans-serif;
        displey: flex;
        align-items:center;
        justify-content: center;
    }

   
    .print-page {
       width: 297mm;      /* العرض */
          min-height: 50mm; /* الطول */
        background: white;
        margin: auto;
        padding: 15mm 20mm;
        box-shadow: 0 0 8px rgba(0,0,0,0.2);
        box-sizing: border-box;
    }

    /* الهيدر */
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

    /* معلومات أعلى الصفحة */
    .info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        font-size: 14px;
    }

    /* جدول البيانات */
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

    tbody tr:nth-child(odd) {
        background: #fafafa;
    }

    /* الفوتر */
    .footer {
        border-top: 2px solid #000;
        text-align: center;
        margin-top: 25px;
        padding-top: 10px;
        font-size: 13px;
    }

     .invoice-totals {
    text-align: right;
    margin-top: 20px;
    font-size: 16px;

  }

   .invoice-totals div{
   margin-bottom: 15px;
   
  }

    /* إعدادات الطباعة فقط */
    @media print {
        body {
            background: none;
        }
        .print-page {
            box-shadow: none;
            margin: 0;
            width: auto;
           
            padding: 0;
            min-height:100mm !important;

        }

        
    }
</style>

</head>

<body>

<div class="print-page">

    <!-- هيدر الصفحة -->
    <div class="header">
        <h1>  تقرير طباعة خاص بالصيانه</h1>
        <p>نموذج جاهز للطباعة</p>
    </div>

    <!-- معلومات عامة -->
    <div class="info">
        <div>الرقم الدفتري :  ${this.getDataPopup.bookNumber}</div>
        <div>التاريخ :  ${this.getDataPopup.requestDate}</div>
    </div>

    <!-- جدول البيانات -->
    <table>
        <thead>
        <tr>
        <th>#</th>
        <th>الوحده</th>
        <th>العقار</th>
        <th>رقم المبني</th>
        <th>المدينه</th>
        <th>الحي</th>
        <th>الشارع</th>
      </tr>
        </thead>

        <tbody>
            <tr>
               <td>1</td>
        <td>${this.getDataPopup?.unitName}</td>
        <td>${this.getDataPopup?.buildingName}</td>
        <td>${this.getDataPopup?.buildingNumber}</td>
        <td>${this.getDataPopup?.city}</td>
        <td>${this.getDataPopup?.district}</td>
        <td>${this.getDataPopup?.street}</td>
            </tr>

          
        </tbody>
    </table>

     <div class="invoice-totals">
        <div><strong>نوع الصيانه :</strong> ${this.getDataPopup.maintenanceTypeName || ''}</div>
        <div><strong>موظف مسئول :</strong> ${this.getDataPopup.employeeName || ''}</div>
        <div><strong>الحاله :</strong> ${this.getDataPopup.status || ''}</div>
        <div><strong>الصندوق / البنك :</strong> ${this.getDataPopup.accountName || ''}</div>
        <div><strong>المبلغ :</strong> ${this.getDataPopup.amount || ''}</div>
      </div>
   

</div>

<script>
    // فتح نافذة الطباعة تلقائياً بمجرد تحميل الصفحة
    window.onload = () => {
        window.print();
    };

     window.onafterprint = () => {
          window.close();
        };
</script>

</body>
</html>

  
  `
  printOpen?.document.write(html);
  printOpen?.print();
 

 

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
