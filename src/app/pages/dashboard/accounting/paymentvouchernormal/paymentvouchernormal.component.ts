import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { AccountService } from '../accounts/services/account.service';
import { ReceiptVoucherService } from '../receiptvoucher/services/receiptVoucher.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaymentVoucherNormalService } from './services/paymentVoucherNormal.service';

@Component({
  selector: 'app-paymentvouchernormal',
  templateUrl: './paymentvouchernormal.component.html',
  styleUrl: './paymentvouchernormal.component.scss'
})
export class PaymentvouchernormalComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb:FormBuilder=inject(FormBuilder);

  toastr:ToastrService=inject(ToastrService);
  _accountSer:AccountService=inject(AccountService);
  _ReceiptVoucherService:ReceiptVoucherService=inject(ReceiptVoucherService);
  destroyRef:DestroyRef=inject(DestroyRef);
  _paymentVoucherService:PaymentVoucherNormalService=inject(PaymentVoucherNormalService);





  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111 Properties
  paymentVoucherForm=this.fb.group({
       voucherNo: [null,[Validators.minLength(3)]],
      voucherDate: [new Date().toISOString().split('T')[0],[Validators.required]],
      paymentMethod: ['نقدي',[Validators.required]],
      amount: ['',[Validators.required]],
      notes: ['',[Validators.required]],
      debitAccountId: [null,[Validators.required]],
      creditAccountId: [null,[Validators.required]]
  })



     paymentVouchersData:any = [];
getAllDataAccount:any[]=[];
getAllDataFinancialAccount:any[]=[];

// pagination

pageIndex=1
pageSize=10
btnAddandUpdate='add'
// showDelete=false
idUpdate:any
showDelete=false;
taxValue=0;
deleteId:any


@ViewChild('NumberVoucher') NumberVoucher!:ElementRef

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111 methods

ngOnInit(){
    this.getAllAccounts()
  this.getAllFinancialAccounts();
  this.getAllDataPaymentVoucher1();
}

onSubmit(){
  if(this.paymentVoucherForm.valid){

    if(this.btnAddandUpdate=='add'){
      this._paymentVoucherService.createpaymentVoucher(this.paymentVoucherForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      //console.log(res)
      this.NumberVoucher.nativeElement.value=res;
      this.toastr.show('تم اضافه السند بنجاح','success');
      this.paymentVoucherForm.reset();
      this.getAllDataPaymentVoucher1()
      
      // this.btnAddandUpdate='add';
      // this.getAllDataReceiptVoucher()
    })
    }else{
      // Update

      let data={
        id:this.idUpdate,
        voucherNo: this.paymentVoucherForm.value.voucherNo,
        voucherDate: this.paymentVoucherForm.value.voucherDate,
        amount: this.paymentVoucherForm.value.amount,
        paymentMethod: this.paymentVoucherForm.value.paymentMethod,
        notes: this.paymentVoucherForm.value.notes,
        debitAccountId: this.paymentVoucherForm.value.debitAccountId,
        creditAccountId: this.paymentVoucherForm.value.creditAccountId
      }

      //console.log(data);
      this._paymentVoucherService.updateData(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
        //console.log(res)
        this.toastr.show('تم تعديل السند بنجاح','success');
        this.btnAddandUpdate='add';
        this.paymentVoucherForm.reset();
        this.getAllDataPaymentVoucher1();
        this.NumberVoucher.nativeElement.value='';
      })
    }
      
  }else{
    this.paymentVoucherForm.markAllAsTouched();
  }
}

onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
  this.getAllDataPaymentVoucher1();
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
    //console.log(res)
    this.getAllDataFinancialAccount = res.rows
    // //console.log("No",this.getAllDataFinancialAccount)

  })

  
}


getAllDataPaymentVoucher1(){
  let pagination={
    paginationInfo: {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
  }
  this._paymentVoucherService.getAllDataPaymentVoucher(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    this.paymentVouchersData=res
    //console.log(res);
  })
}

onClose(){
  this.showDelete=false;
}

deleteConfirmed(e:any){
  this.showDelete=false;
  this._paymentVoucherService.deleteData(e).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف السند بنجاح','success');
    this.getAllDataPaymentVoucher1();
    this.paymentVoucherForm.reset();
    this.btnAddandUpdate='add';
    this.idUpdate=null;
  }
  )

}


showDeletePopup(id:any){

  if(id){
    this.showDelete=true;
    this.deleteId=id
  }

}


getUpdateData(id:any){
this.idUpdate=id

  this._paymentVoucherService.getDataUpdate(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.NumberVoucher.nativeElement.value=res.id
    this.taxValue=Number(res.net) / Number(1 + res.tax / 100) 
    this.paymentVoucherForm.patchValue({
      voucherNo:res.voucherNo,
      voucherDate:res.voucherDate.split('T')[0],
      paymentMethod:res.paymentMethod,
      amount:this.taxValue.toFixed(2),
      notes:res.notes,
      debitAccountId:res.creditAccountNumber,
      creditAccountId:res.debitAccountNumber
    })
  
    this.btnAddandUpdate='update';
    
  })
}

}
