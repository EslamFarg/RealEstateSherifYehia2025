import { Component, DestroyRef, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OwnerpaymentvoucherService } from '../services/ownerpaymentvoucher.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';

@Component({
  selector: 'app-addpaymentvoucher',
  templateUrl: './addpaymentvoucher.component.html',
  styleUrl: './addpaymentvoucher.component.scss'
})
export class AddpaymentvoucherComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services
fb:FormBuilder=inject(FormBuilder);
_accountServices:AccountService=inject(AccountService);
_ownerPaymentVoucherServices:OwnerpaymentvoucherService=inject(OwnerpaymentvoucherService);
destroyRef:DestroyRef=inject(DestroyRef);
toastr:ToastrService=inject(ToastrService)
editBehaviorSubject:EditBehaviorServiceService=inject(EditBehaviorServiceService)
showPopupSearch:any;


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111 Properties
FilterData=[
  {id:1,name:'اسم السمسار'},
  {id:1,name:'رقم الجوال'},
  {id:1,name:'رقم الهويه'},
]
paymentVoucherForm=this.fb.group({
  
  voucherNo: ['',[Validators.required,Validators.minLength(3)]],
  voucherDate: [new Date().toISOString().split('T')[0],[Validators.required]],
  paymentMethod: ['cash'],
  amount: 0,
  notes: [''],
  ownerId: [0,[Validators.required]],
  debitAccountId:[0,Validators.required] ,
  creditAccountId:  [null,Validators.required],
  ownerPaymentDetails: this.fb.array([])

})

idSearchOwner:any
canBtnsShow=false;

formDataSearch=this.fb.group({
  financiallyAccountId:[null],
  name:[''],
  email:[''],
  mobile:[''],
  nationalID:[''],
})

accountData:any;
showDelete=false
deleteId:any
btnAddandUpdate='add'


   paymentData:any = [];
   Months=['','يناير','فبراير','مارس','ابريل','ماي','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر']
  //  getAllDataSearch:any={rows: []};
  getTax:any
  @ViewChildren('paidAmount') paidAmountElement?: QueryList<ElementRef>;
  @ViewChildren('remainingAmount') remainingAmountElement?: QueryList<ElementRef>;
  @ViewChildren('amountDueElement') amountDueElement?: QueryList<ElementRef>;
  @ViewChild('vouchernumber') voucherNumber!:ElementRef
  @ViewChildren('oneCheckElement') oneCheckElement!:QueryList<ElementRef>
  @ViewChild('searchVal') searchVal!:ElementRef;
  @ViewChild('checkAll') checkAll!:ElementRef
  PaidTotalAmount=0
  TotalpaidTaxAmount=0
  RemainingTotalAmount=0;
  TotalAmountDue=0;
  itemChecked:any[]=[];
  checksWrite:any=false
  idUpdate:any
  // showPopupSearch=false
  dataArraySearch:any=[];
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods
calcTotalPaidAmout() {
  this.PaidTotalAmount = 0; 

  this.paidAmountElement?.forEach((el: ElementRef) => {
    const value = parseFloat(el.nativeElement.value) || 0; // ✅ يمنع NaN
    this.PaidTotalAmount += value;
  });

  return this.PaidTotalAmount;
}


calcTotalTaxPaidAmount(amount:any,item: any) {

  const paid = Number(amount) || 0;
  const taxPercent = Number(this.getTax) || 0;

  // total including tax
  item.totalWithTax = paid + (paid * taxPercent / 100);

  return item.totalWithTax;
}


ngOnInit(){
 
  this.editBehaviorSubject.idSubscribe.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((id:any)=>{
    if(id){
      this.getDataById({value:id})
    }
  })

  this.getAllAccounts();
}


ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  
}

getAllAccounts(){
this._accountServices.getAllData({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
  this.accountData = res.rows;
})
}


totalAmount:any

searchDataFilter(e:any){

  let shapeSearch={
  criteriaDto: {
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  },
  searchFilter: {
    column: 0,
    value: e.value
  }
}
if(e.index == 0){
    shapeSearch.searchFilter.column=1
  }else if(e.index == 1){
    shapeSearch.searchFilter.column=3
    
  }else if(e.index == 2){
    shapeSearch.searchFilter.column=2
  }


  this._ownerPaymentVoucherServices.searchOwner(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{


    this.showPopupSearch=!this.showPopupSearch

    this.dataArraySearch=res.rows


    
  

  

   
   
    // !!!!!!!!!!!!1 end

    // Get Tax;

    this._ownerPaymentVoucherServices.getDataTaxes().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  
      this.getTax=res

      

      this.TotalpaidTaxAmount=this.totalAmount / (1 + (this.getTax / 100));
      // this.canBtnsShow=true;
    })

  })


}


calcTotalRemaining() {
  this.RemainingTotalAmount = 0;

  this.paymentData.forEach((item: any) => {
    this.RemainingTotalAmount += Number(item.remainingAmount) || 0;
  });
}




// onPaidAmountChange(event: any, item: any) {
//   let value = Number(event.target.value) || 0;

//   if (value > item.amountDue) {
//     value = item.amountDue;
//     event.target.value = value;
//   }

//   // حفظ القيمة مباشرة في الـ item
//   item.paidAmount = value;

//    item.remainingAmount = item.amountDue - value; // ✅ تحديث المتبقي مباشرة
//    item.totalWithAmount=item.amountDue - value
//   //  this.RemainingTotalAmount=item.remainingAmount
//   // تحديث العناصر المختارة
//   const index = this.itemChecked.findIndex(x => x.contractInstallmentId === item.contractInstallmentId);
//   if (index > -1) {
//     this.itemChecked[index].amount = value;
//   } else {
//     // this.itemChecked.push({ contractInstallmentId: item.contractInstallmentId ?? item.id, amount: value });
//   }

//   this.calculateTotals();
// }
// }


onPaidAmountChange(event: any, item: any) {
  let value = Number(event.target.value) || 0;

  if (value > item.amountDue) {
    value = item.amountDue;
    event.target.value = value;
  }

  item.paidAmount = value;
  item.remainingAmount = item.amountDue - value;

  const id = item.contractInstallmentId ?? item.id;

  // لو فيه مبلغ → اعمل check واضف للـ array
  if (value > 0) {
    const index = this.itemChecked.findIndex(x => x.contractInstallmentId === id);
    if (index === -1) {
      this.itemChecked.push({ contractInstallmentId: id, amount: value });
    } else {
      this.itemChecked[index].amount = value;
    }

    // 🔹 تعليم checkbox تلقائيًا
    const checkbox = this.oneCheckElement?.find(el => Number(el.nativeElement.dataset.id) === id);
    if (checkbox) checkbox.nativeElement.checked = true;

  } else {
    // لو صفر → احذف من itemChecked وشيّل الـ check
    this.itemChecked = this.itemChecked.filter(x => x.contractInstallmentId !== id);

    const checkbox = this.oneCheckElement?.find(el => Number(el.nativeElement.dataset.id) === id);
    if (checkbox) checkbox.nativeElement.checked = false;
  }

  this.calculateTotals();
}










// checkDataItem(e:any,item:any){

//   const checked=e.target.checked;
//    const paid = Number(item.paid || 0); // أو من input إذا موجود


//    console.log(item);

//   if(checked){
//     // const amountDue = Number(item.amountDue) || 0;
   
//     //  this.checksWrite=true
//     // this.itemChecked.push({
//     //   // contractInstallmentId:item.contractInstallmentId:item.contractInstallmentId,
//     //   contractInstallmentId:item.id,
//     //   amount:paid
//     // })

//     const index = this.itemChecked.findIndex(x => x.contractInstallmentId === item.contractInstallmentId);
//     if (index === -1) {
//       this.itemChecked.push({
//         contractInstallmentId: item.contractInstallmentId ?? item.id,
//         amount: paid
//       });
//     }


//       if(!this.itemChecked.some(x => x.contractInstallmentId === item.id)){
//       this.itemChecked.push({ contractInstallmentId:item.id, amount: paid });
//     }


  
//     console.log(this.itemChecked);

   
    
//   }else{
//    this.itemChecked = this.itemChecked.filter(
//   x => Number(x.contractInstallmentId) !== Number(item.id)
// );

// this.checksWrite=false;

//   }


//   this.calculateTotals();
 

// }


checkDataItem(e: any, item: any) {
  const checked = e.target.checked;
  const paid = Number(item.paidAmount || 0);

  console.log(item)

  if (checked) {
    const index = this.itemChecked.findIndex(x => x.contractInstallmentId === item.contractInstallmentId || x.contractInstallmentId === item.id);
    if (index === -1) {
      this.itemChecked.push({
        contractInstallmentId: item.contractInstallmentId ?? item.id,
        amount: paid
      });
    }
  } else {
    // حذف العنصر باستخدام contractInstallmentId الصحيح
    // this.itemChecked = this.itemChecked.filter(
    //   x => x.contractInstallmentId !== item.contractInstallmentId || x.contractInstallmentId !== item.id
    // );

    this.itemChecked = this.itemChecked.filter(
  x => x.contractInstallmentId !== (item.contractInstallmentId ?? item.id)
);

  }

  console.log(this.itemChecked);
  this.calculateTotals();
}


showDeletePopup(){
  this.showDelete=true
  
}


onClose(){
  this.showDelete=false

}


deleteConfirmed(id:any){

  this.showDelete=false;
  this._ownerPaymentVoucherServices.deleteData(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف السند بنجاح','success');
    // this.getAllDataVouchers();
    this.resetForm();
  })
}


onSubmit(){



  if(this.paymentVoucherForm.invalid){
    this.paymentVoucherForm.markAllAsTouched();
  }

  if(this.paymentVoucherForm.valid){
// if(this.realtorPaymentVoucherForm.valid){
    if(this.formDataSearch.get('financiallyAccountId')?.value == null || this.formDataSearch.get('financiallyAccountId')?.value == undefined){
      this.toastr.show('يرجى تحديد حساب','error');
      return ; 
  }


let initVal=0;

this.itemChecked.forEach((item) => {
  
  initVal+=item.amount

})






  let data={
    
  voucherNo: this.paymentVoucherForm.get('voucherNo')?.value,
  voucherDate: this.paymentVoucherForm.get('voucherDate')?.value,
  paymentMethod: this.paymentVoucherForm.get('paymentMethod')?.value,
  amount: initVal,
  notes: this.paymentVoucherForm.get('notes')?.value,
  ownerId: this.paymentVoucherForm.get('ownerId')?.value,
  debitAccountId: this.formDataSearch.get('financiallyAccountId')?.value,
  creditAccountId: this.paymentVoucherForm.get('creditAccountId')?.value,
  ownerPaymentDetails:[] as { contractInstallmentId: number; amount: number }[]  

  }

  
data.ownerPaymentDetails = this.itemChecked
  .filter(x => x.contractInstallmentId !== undefined) // فقط العناصر المدفوعة
  .map(x => ({
    // contractInstallmentId: x.contractInstallmentId,
    contractInstallmentId: x.contractInstallmentId ?? x.id,
    amount: x.amount

  }));



  

  if(this.btnAddandUpdate == 'add'){







    this._ownerPaymentVoucherServices.createOwnerPaymentVoucher(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.toastr.show('تم اضافه السند بنجاح','success');
      
      this.voucherNumber.nativeElement.value=res;
      this.canBtnsShow=true;
      this.btnAddandUpdate='update';
      this.idUpdate=res
      // this.getAllDataVouchers();
    })


    
    

  }else{
    // Update

     let updateData={
      id:this.idUpdate,
      ...data,
  //      ownerPaymentDetails: this.itemChecked.map(item => ({
  //   contractInstallmentId: item.contractInstallmentId,
  //   amount: item.amount
  // }))

   ownerPaymentDetails: this.itemChecked
    .filter(x => Number(x.amount) > 0)
    .map(x => ({
      contractInstallmentId: x.contractInstallmentId,
      amount: x.amount
    }))
    }
    // updateData.ownerPaymentDetails = [];

    

   

    this._ownerPaymentVoucherServices.updateOwnerPaymentVoucher(updateData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.toastr.show('تم تعديل السند بنجاح','success');
      this.btnAddandUpdate='update';
      this.canBtnsShow=true;
    })

  }

}

}




resetForm(){
    this.itemChecked=[]
    this.paymentData=[]

  // 2) إعادة ضبط الفورم بقيم افتراضية صحيحة
  this.paymentVoucherForm.reset({
    paymentMethod: 'cash',
    amount: 0,
    ownerId: 0,
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

  this.voucherNumber.nativeElement.value = '';
  this.paymentData=[];
  this.idUpdate = null;
  this.canBtnsShow=false;

  this.btnAddandUpdate = 'add';
}



checkAllData(e: any) {
  const checked = e.target.checked;

  if (!this.paymentData || !this.paymentData.rows) return;

  if (checked) {
    // تفعيل كل الـ checkboxes
    this.oneCheckElement.forEach(element => {
      element.nativeElement.checked = true;
    });

    // تحديث itemChecked بشكل صحيح
    this.itemChecked = this.paymentData.rows.map((item: any) => ({
      contractInstallmentId: item.contractInstallmentId,
      amount: item.amount
    }));
  } else {
    // إلغاء كل الـ checkboxes
    this.oneCheckElement.forEach(element => {
      element.nativeElement.checked = false;
    });
    this.itemChecked = [];
  }


}



calculateTotals() {
  this.TotalAmountDue = 0;
  this.PaidTotalAmount = 0;
  this.RemainingTotalAmount = 0;

  this.paymentData.rows.forEach((item: any) => {


    
    item.remainingAmount = item.amountDue - item.paid;

    this.TotalAmountDue += item.amountDue;
    this.PaidTotalAmount += item.paid;
    this.RemainingTotalAmount += item.remainingAmount;

  });
}


getDataById(e:any){
 
  this._ownerPaymentVoucherServices.getDataById(e.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.btnAddandUpdate = 'update';

    
      this.deleteId=res.id;

      this.paymentVoucherForm.patchValue({
        voucherNo: res.voucherNo,
        voucherDate: res.voucherDate.split('T')[0],
        paymentMethod: res.paymentMethod,
        amount: res.net,
        notes: res.notes,
        ownerId: res.ownerId,
        debitAccountId: res.debitAccountId,
        creditAccountId: res.creditAccountId,

      });
     



      this.formDataSearch.patchValue({
        financiallyAccountId: res.debitAccountId,
        name: res.debitAccountName,
        email: res.email,
        mobile: res.mobile ?? res.phoneNumber,
        nationalID: res.nationalID
      })
      
      // table
      this.paymentData = {
        rows: res.listOwnerMonths.map((item: any) => ({
 
          contractInstallmentId: item.id, 
          contractId: item.contractId,
          propertyName: item.propertyName,
          unitName: item.unitName,
          monthNumber: item.monthNumber,
          amount:item.amountDue,
          paidAmount: item.netPaidInThisVoucher,
          isInThisVoucher:item.isInThisVoucher,
          monthIndex: item.monthIndex,
          // amountDue:item.amountDue,
          remainingAmount:item.amountDue - (item.netPaidInThisVoucher || 0)
        }))
      };


   

      this.calculateTotals();




      this.itemChecked = res.listOwnerMonths
       .filter((item: any) => item.netPaidInThisVoucher > 0)
  .map((item:any) => ({
    contractInstallmentId: item.id,
    amount: item.netPaidInThisVoucher  
  }));







      
      this.idUpdate=res.id
      this.canBtnsShow=true


      

    });
  // })
}


isItemEditable(item: any): boolean {
  // return this.itemChecked.some(x => x.contractInstallmentId === item.id);
  return this.itemChecked.some(x => x.contractInstallmentId === item.id);

}


ChangeSelect(e:any){
  

}

sendDataSelectedSearch(e:any){

    const row=e
  this.showPopupSearch=!this.showPopupSearch


   this.formDataSearch.patchValue(
      {
        financiallyAccountId:row.financiallyAccountId,
        name:row.name,
        nationalID:row.nationalID,
        email:row.email,
        mobile:row.mobile
      }
    )

    
    this.idSearchOwner=row.id;
    this.paymentVoucherForm.get('ownerId')?.setValue(row.id);
    
    
    let pagination={
  "paginationInfo": {
    "pageIndex": 0,
    "pageSize": 0
  }
}
    this._ownerPaymentVoucherServices.getDatailsContracts(this.idSearchOwner,pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
 

  

    this.paymentData = {
    rows: res.rows.map((item: any) => ({
      ...item,
      paidAmount: item.netPaidInThisVoucher || 0,
      remainingAmount: item.amountDue - (item.netPaidInThisVoucher || 0)
    }))
  };

  // ✅ تحديث itemChecked بالقيم الحالية
  this.itemChecked = this.paymentData.rows
    .filter((item: any) => item.paidAmount > 0)
    .map((item: any) => ({
      contractInstallmentId: item.contractInstallmentId,
      amount: item.paid
    }));

  // إعادة حساب المجموعات
  this.calculateTotals();


     
      this.totalAmount=row.amountDue
      
      

      setTimeout(() => {
        // this.calcTotalRemaining();
              let TotalAmountDue=0;
  this.amountDueElement?.forEach((amountDue)=>{
    TotalAmountDue += Number(amountDue.nativeElement.textContent)
  })
  this.TotalAmountDue=TotalAmountDue
      }, 200);
    })





  
}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.editBehaviorSubject.clearId){
    this.editBehaviorSubject.clearId();
  }
}
}
