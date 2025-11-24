import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { MaintenanceService } from '../../maintenance/maintenance/services/maintenance.service';
import { AccountService } from '../accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReceiptVoucherService } from './services/receiptVoucher.service';
import { checkUsername } from '../../../../shared/validations/checkUsername';
import { ReceiptVoucher } from './models/receiptvoucher';
import { totalTax } from '../../../../shared/functions/totalTax';

@Component({
  selector: 'app-receiptvoucher',
  templateUrl: './receiptvoucher.component.html',
  styleUrl: './receiptvoucher.component.scss'
})
export class ReceiptvoucherComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services
fb:FormBuilder=inject(FormBuilder);
toastr:ToastrService=inject(ToastrService);
_accountSer:AccountService=inject(AccountService);
_ReceiptVoucherService:ReceiptVoucherService=inject(ReceiptVoucherService);
destroyRef:DestroyRef=inject(DestroyRef);



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties

  //  receiptVouchersData:{rows?:ReceiptVoucher[],paginationInfo?:null} = {
  //   rows: [],
  //   paginationInfo: null
  //  }
   receiptVouchersData:any = [];
getAllDataAccount:any[]=[];
getAllDataFinancialAccount:any[]=[];
// pagination

pageIndex=1
pageSize=10

receiptForm=this.fb.group({
   voucherNo: ['',[Validators.required,Validators.minLength(3)]],
  voucherDate: [new Date().toISOString().split('T')[0],[Validators.required]],
  paymentMethod: ['نقدي',[Validators.required]],
  amount: [0,[Validators.required]],
  notes: ['',[Validators.required]],
  debitAccountId: [null,[Validators.required]],
  creditAccountId: [null,[Validators.required]]
})

btnAddandUpdate='add';
idUpdate:any
showDelete=false;
taxValue=0;
deleteId:any
@ViewChild('NumberVoucher') NumberVoucher!:ElementRef
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Methods


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllAccounts()
  this.getAllFinancialAccounts();
  this.getAllDataReceiptVoucher();
}


onPageChanged(page: number) {
  this.pageIndex = page;
  this.getAllDataReceiptVoucher();
}


getAllAccounts() {
  this._accountSer.getAllData({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    //console.log(res)
    this.getAllDataAccount = res.rows.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        financiallyAccountId:item.financiallyAccountId
      }
    })

  })
}



getAllFinancialAccounts() {
  this._ReceiptVoucherService.getAllFinancialAccount().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    //console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRr",res)
    this.getAllDataFinancialAccount = res.rows
    // //console.log("No",this.getAllDataFinancialAccount)

  })

  
}

OnSubmit(){

  //console.log(this.receiptForm.value)
  if(this.receiptForm.valid){

if(this.btnAddandUpdate == 'add'){

  let data={
     ...this.receiptForm.value,
      // 👈 هنا التحويل المؤقت
  }
  
    this._ReceiptVoucherService.createreceiptVoucher(this.receiptForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      //console.log(res)
      this.NumberVoucher.nativeElement.value=res;
      this.toastr.show('تم اضافه السند بنجاح','success');
      this.receiptForm.reset();
      this.getAllDataReceiptVoucher()
    })
    
    // //console.log(this.receiptForm.value);

   
    //console.log(this.receiptForm.value)
}else{

  let data={
  id: this.idUpdate,
  voucherNo: this.receiptForm.value.voucherNo,
  voucherDate: this.receiptForm.value.voucherDate,
  paymentMethod: this.receiptForm.value.paymentMethod,
  amount: this.receiptForm.value.amount,
  notes: this.receiptForm.value.notes,
  debitAccountId: this.receiptForm.value.debitAccountId,
  creditAccountId: this.receiptForm.value.creditAccountId
}




  this._ReceiptVoucherService.updateDate(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    //console.log(res)
    this.toastr.show('تم تعديل السند بنجاح','success');
    this.receiptForm.reset();
    this.btnAddandUpdate='add';
    this.getAllDataReceiptVoucher()
    this.NumberVoucher.nativeElement.value='';
    
  })
}
  }else{
    this.receiptForm.markAllAsTouched();
  }
}



getAllDataReceiptVoucher(){

  let pagination={
    paginationInfo: {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
  }
  this._ReceiptVoucherService.getAllReceiptVoucher(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    // //console.log(res)

    // let taxValue=totalTax(res.rows)
    // let totalWithTax=taxValue+res.rows[0].amount

    this.receiptVouchersData=res
    //console.log("Receipt",this.receiptVouchersData)
  })
}

// getDataUpdate(id:any){

//   this.idUpdate=id;

//   this.btnAddandUpdate='update';

//   this._ReceiptVoucherService.getDataUpdate(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
//     //console.log(res);
//     this.NumberVoucher.nativeElement.value=res.id
//         this.taxValue = Number(res.tax) || 0;

//          const amountWithoutTax = Number(res.net) / (1 + this.taxValue / 100);
//         //  const taxAmount = amountWithoutTax * (this.taxValue / 100); 
//     this.receiptForm.patchValue({
//       voucherNo:res.voucherNo,
//       voucherDate:res.voucherDate.split('T')[0],
//       paymentMethod:res.paymentMethod,
//       // amount:amountWithoutTax.toFixed(2),
//       amount: Number(amountWithoutTax.toFixed(2)),
//       notes:res.notes,
//       debitAccountId:res.debitAccountNumber,
//       creditAccountId:res.creditAccountNumber
//     });



//     //console.log("Update",this.receiptForm.value);

//     // console

    
//     // this.totalWithTax=res.totalWithTax

//   })



// }

getDataUpdate(id: any) {
  this.idUpdate = id;
  
 

  this._ReceiptVoucherService.getDataUpdate(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {
      //console.log(res);

      this.NumberVoucher.nativeElement.value = res.id;
      this.taxValue = Number(res.tax) || 0;

      // احسب المبلغ بدون ضريبة
      const amountWithoutTax = Number(res.net) / (1 + this.taxValue / 100);

      this.receiptForm.patchValue({
        voucherNo: res.voucherNo,
        voucherDate: res.voucherDate.split('T')[0],
        paymentMethod: res.paymentMethod,
        amount: res.net, // ✅ هنا الحل
        notes: res.notes,
        debitAccountId: res.debitAccountNumber,
        creditAccountId: res.creditAccountNumber
      });

      // //console.log("Update form value:", this.receiptForm.value);
       this.btnAddandUpdate = 'update';
    });
}



showPopupDelete(id:any){
  this.showDelete=true;
  this.deleteId=id;

}
deleteConfirmed(e:any){

  this.showDelete=false;
  this._ReceiptVoucherService.deleteData(e).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف السند بنجاح','success');
    this.getAllDataReceiptVoucher();
    this.idUpdate=null;
    this.receiptForm.reset();
    this.btnAddandUpdate='add';
  })

}

onClose(){
  this.showDelete=false;
}


onChanges(e:any){
  //console.log(e)

}


changeBank(e:any){
  //console.log(e);

}

}
