import { ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Realtor } from '../../../main/realtor/models/realtor';
import { RealtorService } from '../../../main/realtor/services/realtor.service';
import { RealtorpaymentvoucherService } from '../services/realtorpaymentvoucher.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';

@Component({
  selector: 'app-addrealtorpaymentvoucher',
  templateUrl: './addrealtorpaymentvoucher.component.html',
  styleUrl: './addrealtorpaymentvoucher.component.scss'
})
export class AddrealtorpaymentvoucherComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb:FormBuilder=inject(FormBuilder);
  _accountsService:AccountService=inject(AccountService);
  _realtorPaymentVoucherServices:RealtorpaymentvoucherService=inject(RealtorpaymentvoucherService);

  destroyRef:DestroyRef=inject(DestroyRef)

cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
EditBehaviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService);

showPopupSearch=false
dataArraySearch:any=[]
isVisiablePrint=false
getDataPrint:any
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties





  toastr:ToastrService=inject(ToastrService);
  realtorPaymentVoucherForm=this.fb.group({
  voucherNo: ['',[Validators.required,Validators.minLength(3)]],
  voucherDate: [new Date().toISOString().split('T')[0],Validators.required],
  paymentMethod: ['cash',Validators.required],
  amount: [0,Validators.required],
  notes: [''],
  brokerId: [0,Validators.required],
  debitAccountId: [0,Validators.required],
  creditAccountId: [null,Validators.required],
  brokerPaymentVoucherDetails: [
    {
      contractId: [0],
      amount: [0]
    }
  ]
})


idSearchRealtor:any
btnAddandUpdate='add'
idUpdate:any
showDelete=false
deleteId:any
formDataSearch=this.fb.group({
  financiallyAccountId:[null],
  name:[''],
  email:[''],
  mobile:[''],
  nationalID:[''],
})

canShowBtns=false
accountData:any;
itemsChecked: any[] = [];
getAllDataSearch:any
FilterData=[
  {id:1,name:'اسم السمسار'},
  {id:1,name:'رقم الجوال'},
  {id:1,name:'رقم الهويه'},
]
  

@ViewChild('VoucherNumber') VoucherNumber!:ElementRef;
// @ViewChild('paidAmount') paidAmount!:ElementRef;
@ViewChild('checkAll') checkAll!:ElementRef;
@ViewChild('valSearchById') valSearchById!:ElementRef;


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


ngOnInit(){
  // if
  this.EditBehaviorServices.idSubscribe.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((id:any)=>{
    // //console.log(res);
    if(id){


      this._realtorPaymentVoucherServices.getByIdBrokerPaymentVoucher(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        //console.log(res);
        
  this.itemsChecked = [];
  this.getAllDataSearch = { rows: [] };
  this.getDataPrint=res;
  //console.log('getDataPrint',this.getDataPrint);

  setTimeout(() => {
    if (this.checkAll) this.checkAll.nativeElement.checked = false;
  });

  this._realtorPaymentVoucherServices.getByIdBrokerPaymentVoucher(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {

      this.btnAddandUpdate = 'update';

      //console.log('res', res);
      this.deleteId=res.id;
      this.realtorPaymentVoucherForm.patchValue({
        voucherNo: res.voucherNo,
        voucherDate: res.voucherDate.split('T')[0],
        paymentMethod: res.paymentMethod,
        amount: res.net,
        notes: res.notes,
        brokerId: res.brokerId,
        debitAccountId: res.debitAccountId,
        creditAccountId: res.creditAccountId
      });

      this.formDataSearch.patchValue({
        financiallyAccountId: res.debitAccountId,
        name: res.debitAccountName,
        email: res.email,
        mobile: res.phoneNumber,
        nationalID: res.nationalID
      });

      //console.log("Search",this.formDataSearch.value)
      // fill itemsChecked
      res.brokerCommissionResponseDtos.forEach((d: any) => {
          if (d.isInThisVoucher) {
    this.itemsChecked.push({
      contractId: d.contractId,
      paidAmount: d.netPaidInThisVoucher
    });
  }
    
      });



      // table
      this.getAllDataSearch = {
        rows: res.brokerCommissionResponseDtos.map((item: any) => ({
          contractId: item.contractId,
          propertyName: item.propertyName,
          unitName: item.unitName,
          month: item.month,
          brokerCommission: item.brokerCommission,
          brokerPaidAmount: item.netPaidInThisVoucher,
          remainingAmount: item.brokerCommission - item.netPaidInThisVoucher,
            isInThisVoucher: item.isInThisVoucher
        }))
      };


      //console.log(this.getAllDataSearch);
      //console.log('RelatorForm', this.realtorPaymentVoucherForm.value);

      this.cdr.detectChanges();

      this.idUpdate=res.id
      this.canShowBtns=true
      //console.log(this.idUpdate)
      setTimeout(() => {
      //   if (this.checkAll) this.checkAll.nativeElement.checked = true;
      //   this.checkboxes.forEach(cb =>
      //      cb.nativeElement.checked = true);

    
        this.checkboxes.forEach((checkbox, index) => {
    if (this.getAllDataSearch.rows[index].isInThisVoucher) {
      checkbox.nativeElement.checked = true;
    }
  });
      });

    });
        this.canShowBtns=true;
        this.btnAddandUpdate='update';
        this.idUpdate=id;
        this.VoucherNumber.nativeElement.value=res.id;
      })

   
      // this.getUpdateData(id);
    
      
    }
    // if(res){
    //   this.btnAddandUpdate='update';
    //   this.idUpdate=res.id;
    //   this.getUpdateData(res.id);
    // }
  })
  this.getAllAccounts();
}
onSubmit(){
  if(this.realtorPaymentVoucherForm.valid){
    if(this.formDataSearch.get('financiallyAccountId')?.value == null || this.formDataSearch.get('financiallyAccountId')?.value == undefined){
      this.toastr.show('يرجى تحديد حساب','error');
      return ; 
    }

       let initVal=0;

this.itemsChecked.forEach((item) => {
  
  initVal+=item.paidAmount

})

    let data={
  voucherNo: this.realtorPaymentVoucherForm.get('voucherNo')?.value,
  voucherDate: this.realtorPaymentVoucherForm.get('voucherDate')?.value,
  paymentMethod: this.realtorPaymentVoucherForm.get('paymentMethod')?.value,
  amount: initVal,
  notes: this.realtorPaymentVoucherForm.get('notes')?.value,
  brokerId: this.realtorPaymentVoucherForm.get('brokerId')?.value,
  debitAccountId: this.formDataSearch.get('financiallyAccountId')?.value,
  creditAccountId: this.realtorPaymentVoucherForm.get('creditAccountId')?.value,
  brokerPaymentVoucherDetails:[] as { contractId: number; amount: number }[]  
}

  if(this.btnAddandUpdate == 'add'){
   



    

this.itemsChecked.forEach((item) => {
  
  data.brokerPaymentVoucherDetails.push({
    contractId: item.contractId,
    amount: item.paidAmount
  });

  
  
})

//console.log(data);




this._realtorPaymentVoucherServices.createBrokerPaymentVoucher(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  this.toastr.show('تم الاضافه بنجاح','success');
  this.btnAddandUpdate='update';
  this.VoucherNumber.nativeElement.value=res;
  // this.getAllDataSearchBroker();
  this.canShowBtns=true
  this.idUpdate=res

})


  }else{
    // Update
    // debugger
    let updateData={
      id:this.idUpdate,
      ...data
    }

  
    updateData.brokerPaymentVoucherDetails = [];

    
this.itemsChecked.forEach((item) => {
  
  updateData.brokerPaymentVoucherDetails.push({
    contractId: item.contractId,
    amount: item.paidAmount
  });

  
  
})


    

    this._realtorPaymentVoucherServices.updateBrokerPaymentVoucher(updateData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.toastr.show('تم التعديل بنجاح','success');
      this.btnAddandUpdate='update';
      this.canShowBtns=true
    })


  }

  }else{
    this.realtorPaymentVoucherForm.markAllAsTouched();
  }
}




getAllAccounts(){
this._accountsService.getAllData({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
  this.accountData = res.rows;
})
}

searchGetById(val: any) {
  const id = val.value.trim();

  if (!id) {
    this.toastr.show('يرجى إدخال رقم سند صالح', 'error');
    return;
  }

  this.itemsChecked = [];
  this.getAllDataSearch = { rows: [] };

  setTimeout(() => {
    if (this.checkAll) this.checkAll.nativeElement.checked = false;
  });

  this._realtorPaymentVoucherServices.getByIdBrokerPaymentVoucher(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {

      this.btnAddandUpdate = 'update';

      //console.log('res', res);
      this.deleteId=res.id;
      this.realtorPaymentVoucherForm.patchValue({
        voucherNo: res.voucherNo,
        voucherDate: res.voucherDate.split('T')[0],
        paymentMethod: res.paymentMethod,
        amount: res.net,
        notes: res.notes,
        brokerId: res.brokerId,
        debitAccountId: res.debitAccountId,
        creditAccountId: res.creditAccountId
      });

      this.formDataSearch.patchValue({
        financiallyAccountId: res.debitAccountId,
        name: res.debitAccountName,
        email: res.email,
        mobile: res.phoneNumber,
        nationalID: res.nationalID
      });

      //console.log("Search",this.formDataSearch.value)
      // fill itemsChecked
      res.brokerPaymentVoucherDetails.forEach((d: any) => {
        this.itemsChecked.push({
          contractId: d.contractId,
          paidAmount: d.paidAmmount 
        });
      });



      // table
      this.getAllDataSearch = {
        rows: res.brokerPaymentVoucherDetails.map((item: any) => ({
          contractId: item.contractId,
          propertyName: item.propertyName,
          unitName: item.unitName,
          month: item.month,
          brokerCommission: item.totalAmount,
          brokerPaidAmount: item.paidAmmount,
          remainingAmount: item.totalAmount - item.paidAmmount
        }))
      };


      //console.log(this.getAllDataSearch);
      //console.log('RelatorForm', this.realtorPaymentVoucherForm.value);

      this.cdr.detectChanges();

      this.idUpdate=res.id
      this.canShowBtns=true
      //console.log(this.idUpdate)
      setTimeout(() => {
        if (this.checkAll) this.checkAll.nativeElement.checked = true;
        this.checkboxes.forEach(cb => cb.nativeElement.checked = true);
      });

      this.getDataPrint=res;

    });
}




SearchFilter(e:any){

  if(!e || !e.value){return;}


  let ShapeDataFilter={
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  },
  "searchFilter": {
    "column": 0,
    value: e.value
  }
}
  
  // //console.log(e);

  if(e.index == 0){
    ShapeDataFilter.searchFilter.column=1
  }else if(e.index == 1){
    ShapeDataFilter.searchFilter.column=3
    
  }else if(e.index == 2){
    ShapeDataFilter.searchFilter.column=2
  }



  this._realtorPaymentVoucherServices.searchBroker(ShapeDataFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    // this.getAllDataSearch=res.rows;


    this.showPopupSearch=true;
    this.dataArraySearch=res.rows

    // //console.log("Search Broker : " ,this.dataArraySearch);

    // //console.log(this.dataArraySearch);


    // //console.log(this.getAllDataSearch);
    
  })


  }




get TotalBrokerCommission(): number {
  if (!this.getAllDataSearch || !this.getAllDataSearch.rows) return 0;

  return this.getAllDataSearch.rows.reduce(
    (acc: number, curr: any) => acc + (curr.brokerCommission || 0),
    0
  );
}



@ViewChildren('rowCheckbox') checkboxes!: QueryList<ElementRef>

PaidAmount: number = 0;
@ViewChildren('paidAmountInput') paidAmountElement!:QueryList<ElementRef>
// onPaidChange(event: any, item: any) {
//    let value = parseFloat(event.target.value) || 0;
//   if (value > item.brokerCommission) {
//     // event.target.value = item.brokerCommission;
//      value = item.brokerCommission;
//     event.target.value = value;
//   }

//   // item.remainingAmount = item.brokerCommission - event.target.value;

//     item.brokerPaidAmount = value;
//   item.remainingAmount = item.brokerCommission - value;


//   const exist = this.itemsChecked.find(x => x.contractId === item.contractId);
//   if (exist) {
//     exist.paidAmount = value;
//   }

//   // Tot

// }


// onPaidInputChange(event: any, item: any) {
//   let value = parseFloat(event.target.value) || 0;

//   // تحديد الحد الأقصى حسب العمولة
//   if (value > item.brokerCommission) {
//     value = item.brokerCommission;
//     event.target.value = value;
//   }

//   // تحديث القيم
//   item.brokerPaidAmount = value;
//   item.remainingAmount = item.brokerCommission - value;

//   // تحديث itemsChecked
//   const exist = this.itemsChecked.find(x => x.contractId === item.contractId);
//   if (exist) {
//     exist.paidAmount = value;
//   } else {
//     this.itemsChecked.push({
//       contractId: item.contractId,
//       paidAmount: value
//     });
//   }

//   // تحديث الإجمالي فورًا
//   this.updateTotalPaid();
// }

@ViewChildren('rowCheckbox') rowCheckboxs!: QueryList<ElementRef>;
onPaidInputChange(event: any, item: any, checkbox: HTMLInputElement) {
  let value = parseFloat(event.target.value) || 0;

  // الحد الأقصى حسب العمولة
  if (value > item.brokerCommission) {
    value = item.brokerCommission;
    event.target.value = value;
  }

  // تحديث المدفوع والمتبقي
  item.brokerPaidAmount = value;
  item.remainingAmount = item.brokerCommission - value;

  // تحديث itemsChecked
  const exist = this.itemsChecked.find(x => x.contractId === item.contractId);
  if (exist) {
    exist.paidAmount = value;
  } else if(value > 0) {
    this.itemsChecked.push({
      contractId: item.contractId,
      paidAmount: value
    });
  }

  // تفعيل الـ checkbox تلقائيًا إذا تم كتابة أي مبلغ
  if (value > 0) {
    item.isChecked = true;
    if (checkbox) checkbox.checked = true;
  } else {
    item.isChecked = false;
    this.itemsChecked = this.itemsChecked.filter(x => x.contractId !== item.contractId);
    if (checkbox) checkbox.checked = false;
  }

  // تحديث الإجمالي
  this.updateTotalPaid();
}








checkDataId(event:any,item:any){
   const isChecked = event.target.checked;

   //console.log(item)

  if (isChecked) {
    // ✅ لو اتعلم عليه — ضيفه أو حدّثه
    const existing = this.itemsChecked.find(x => x.contractId === item.contractId);

    if (existing) {
      existing.paidAmount = item.brokerPaidAmount || 0;
    } else {
      this.itemsChecked.push({
        contractId: item.contractId,
        paidAmount: item.brokerPaidAmount || 0,
      });
    }
  } else {
    
    this.itemsChecked = this.itemsChecked.filter(x => x.contractId !== item.contractId);
  }

  

 
  //console.log(this.itemsChecked);

}



selectAllChecked(e:any){
  const isChecked=e.target.checked
  // //console.log(e.target.checked);

  if(isChecked){
    this.itemsChecked=this.getAllDataSearch.rows.map((item:any) => ({
    contractId: item.contractId,
    paidAmount: item.brokerPaidAmount || 0
  }));
      this.checkboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = true;
    });
    
  }else{
    this.itemsChecked=[]
      this.checkboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
  }

  //console.log(this.itemsChecked);

}


// @ViewChildren('paidAmount') paidAmountElements!: QueryList<ElementRef>;
get TotalPaidAmount() : number{

   let total = 0;
  this.paidAmountElement?.forEach((el:ElementRef) => {
    // return this.PaidAmount += parseFloat(paidAmount.nativeElement.value)
      const value = parseFloat(el.nativeElement.value) || 0;
    total += value;
  })
  return total;;
}


resetForm(){
   this.itemsChecked=[]
  //  this.getAllDataSearch=[]
  this.getAllDataSearch = { rows: [] };
  this.valSearchById.nativeElement.value = '';
 // 1) تصفير الجدول
  this.itemsChecked = [];
  this.getAllDataSearch = { rows: [] };

  // 2) إعادة ضبط الفورم بقيم افتراضية صحيحة
  this.realtorPaymentVoucherForm.reset({
    paymentMethod: 'cash',
    amount: 0,
    brokerId: 0,
    debitAccountId: 0,
    creditAccountId: null
  });

  // 3) إعادة ضبط نموذج البحث
  this.formDataSearch.reset({
    financiallyAccountId: null,
    name: '',
    email: '',
    mobile: '',
    nationalID: ''
  });

  
  // 4) تصفير المتغيرات
  
  this.idSearchRealtor = 0;
  this.idUpdate = null;
  this.canShowBtns=false;

  this.btnAddandUpdate = 'add';


}


deleteConfirmed(id:any){
  this.showDelete=false;
  this._realtorPaymentVoucherServices.deleteDataBrokerPaymentVoucher(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف الصيانة بنجاح','success');
    this.resetForm();
    this.btnAddandUpdate='add';
    this.VoucherNumber.nativeElement.value='0';
    // this.searchVal.nativeElement.value='';
  })
}

deleteData(){
this.deleteId=this.idUpdate
this.showDelete=true
}

onClose(){
  this.showDelete=false
}


sendDataSelectedSearch(e: any) {

  
    const row=e
    this.showPopupSearch=!this.showPopupSearch
    //console.log('rowBroker', row);

    if(row && row.id){
      this.formDataSearch.patchValue(row);
      this.idSearchRealtor=row.id;
      this.realtorPaymentVoucherForm.get('brokerId')?.setValue(row.id);
      // //console.log(this.idSearchRealtor)
      let pagination={
  paginationInfo: {
    pageIndex: 0,
    pageSize: 0
  }

  
}



// //console.log(this.realtorPaymentVoucherForm);
      this._realtorPaymentVoucherServices.searchBrokerCommissions(this.idSearchRealtor,pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        this.getAllDataSearch=res
        // //console.log(res)
        //console.log(this.getAllDataSearch)
      })


    }

    setTimeout(() => {
  this.updateTotalPaid();
},500);
  
}


updateTotalPaid() {
  let total = 0;

  this.paidAmountElement?.forEach((el: ElementRef) => {
    total += parseFloat(el.nativeElement.value) || 0;
  });

  this.PaidAmount = total;
}


ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.EditBehaviorServices.clearId){
    this.EditBehaviorServices.clearId();
  }
}

}






