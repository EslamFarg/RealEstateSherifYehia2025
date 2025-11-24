import { NgClass, NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from '../toastr/services/toastr.service';

@Component({
  selector: 'app-printemployee',
  templateUrl: './printemployee.component.html',
  styleUrl: './printemployee.component.scss',
  standalone:true,
  imports:[NgFor,NgClass,FormsModule]
})
export class PrintemployeeComponent {

  @Input() showPopup=false;
  @Output() closePopup = new EventEmitter();
  @Input() getDataEmp:any
  itemsChecked:any=[];
  toastr:ToastrService=inject(ToastrService);



   selectCheck=false;
   @ViewChildren('checkitems') checkitems!:QueryList<ElementRef>
  toggleAll(e:any){

  let isChecked=e.target.checked
    
  if(isChecked){
this.itemsChecked=this.getDataEmp.lines;
this.checkitems.forEach((checkbox) => {
  checkbox.nativeElement.checked=true
})
  }else{
    this.itemsChecked=[]
    this.checkitems.forEach((checkbox) => {
      checkbox.nativeElement.checked=false
    })
  }
    
    //console.log(this.itemsChecked);

  }

  closeShowPopup(){
    this.closePopup.emit();
  }


  CheckedData:any

  selectData(e: any, item: any) {
  const isChecked = e.target.checked;

  if (isChecked) {
    // أضف العنصر لو مش موجود
    const exists = this.itemsChecked.some((emp:any) => emp.id === item.id);
    if (!exists) {
      this.itemsChecked.push(item);
    }
  } else {
    this.itemsChecked = this.itemsChecked.filter((emp:any) => emp.id !== item.id);
  }

  //console.log(this.itemsChecked);
}


  printData(){
     if(this.itemsChecked.length == 0 ){
        this.toastr.show('يرجى  تحديد موظف علي الاقل', 'error');
         return
      }
      this.closePopup.emit();
    let openPrint=window.open('','_blank');


    if(!openPrint) return;



      // if (!openPrint) return;


     
     let rowsHtml = '';

      if (this.itemsChecked) {
    this.itemsChecked.forEach((item: any, index: number) => {
      rowsHtml += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.employeeName}</td>
          <td>${item.salary}</td>
          <td>${item.accountName}</td>
          <td>${item.absenceDays}</td>
          <td>${item.loanRepayment}</td>
          <td>${item.penalties}</td>
          <td>${item.rewards}</td>
          <td>${item.netPay}</td>
        </tr>
      `;
    });
  }

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
        <h1>  تقرير طباعة خاص بصرف الرواتب</h1>
        <p>نموذج جاهز للطباعة</p>
    </div>

    <!-- معلومات عامة -->
    <div class="info">
        <div>الرقم الدفتري :  ${this.getDataEmp.bookNumber}</div>
        <div> الشهر  :  ${this.getDataEmp.month}</div>
        <div>التاريخ :  ${this.getDataEmp.date}</div>
    </div>

    <!-- جدول البيانات -->
    <table>
        <thead>
        <tr>
        <th>#</th>
        <th>اسم الموظف</th>
        <th>الراتب</th>
        <th>الصندوق</th>
        <th>قيمه الغياب</th>
        <th>تسديد سلفه</th>
        <th>جزاءات</th>
        <th>مكافاءات</th>
        <th>صافي الراتب</th>
      </tr>
        </thead>

        <tbody>
            ${rowsHtml}

          
        </tbody>
    </table>

    
   

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
  openPrint?.document.write(html);
  openPrint?.print();
 
    

  }

  close(){
    this.closePopup.emit();

  }

  noCloseModal(e:any){
    e.stopPropagation();

  }
}
