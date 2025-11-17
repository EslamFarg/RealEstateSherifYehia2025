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



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111 Properties
FilterData=[
  {id:1,name:'اسم السمسار'},
  {id:1,name:'رقم الجوال'},
  {id:1,name:'رقم الهويه'},
]
paymentVoucherForm=this.fb.group({
  
  voucherNo: ['',[Validators.required,Validators.minLength(3)]],
  voucherDate: ['',[Validators.required]],
  paymentMethod: ['cash'],
  amount: 0,
  notes: [''],
  ownerId: [0,[Validators.required]],
  debitAccountId:[0,Validators.required] ,
  creditAccountId:  [null,Validators.required],
  ownerPaymentDetails: [
    {
      contractInstallmentId: 0,
      amount: 0
    }
  ]

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

    const row=res.rows[0]

    console.log(row)
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
     
      this.paymentData=res;

      console.log(this.paymentData);
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


    // Get Tax;

    this._ownerPaymentVoucherServices.getDataTaxes().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      // console.log("Tax",res);
      this.getTax=res

      // item.amountDue / (1 + (getTax / 100)) | number:'1.1-2'

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



// writePaidAmount(e:any,item:any){
//   const paid = Number(e.target.value) || 0;
//   let amountDue = Number(item.amountDue) || 0;

//    if (paid > amountDue) {
//     e.target.value = amountDue;
//   }


//   // this.itemChecked = this.itemChecked.filter(x => x.contractInstallmentId !== item.id);
//   // this.itemChecked = this.itemChecked.filter(x => x.contractInstallmentId !== item.id);

//   this.itemChecked = this.itemChecked.filter(x => x.contractInstallmentId !== item.contractInstallmentId);


//   if(this.checksWrite){
//     this.itemChecked = this.itemChecked.filter(x => x.id != item.id);
//     this.itemChecked.push({
//       contractInstallmentId:item.id,
//       amount:paid
//     })
    
//     // console.log(this.itemChecked);
//   }
  


//   if(paid > amountDue){
//     e.target.value = amountDue;
//     item.totalWithAmount = 0;
//   }else{
//     item.totalWithAmount = amountDue - paid
  
//   setTimeout(() => {

//     let TotalPaidAmount = 0;
//     let calcTotalRemaining = 0;

//     this.paidAmountElement?.forEach((el: ElementRef) => {
//       const value = parseFloat(el.nativeElement.value) || 0;
//       TotalPaidAmount += value;
//     });
//     this.PaidTotalAmount = TotalPaidAmount;

//     this.remainingAmountElement?.forEach((el: ElementRef) => {
//       const value = parseFloat(el.nativeElement.value) || 0;
//       calcTotalRemaining += value;
//     });
//     this.RemainingTotalAmount = calcTotalRemaining;

//   }, 0);

    
//   }

  
//   if(paid == 0){
//     item.totalWithAmount = 0
//   }

//     // console.log(item.totalWithTax)

// }


// writePaidAmount(e:any, item:any){
//   let paid = Number(e.target.value) || 0;
//   const amountDue = Number(item.amount) || 0;

//   if(paid > amountDue){
//     paid = amountDue;
//     e.target.value = paid;
//   }

//   // تحديث قيمة المدفوع مباشرة في item
//   item.paidAmount = paid;

//   // تحديث itemChecked
//   const existingIndex = this.itemChecked.findIndex(x => x.contractInstallmentId === item.contractInstallmentId);
//   if(existingIndex > -1){
//     this.itemChecked[existingIndex].amount = paid;
//   } else {
//     this.itemChecked.push({
//       contractInstallmentId: item.contractInstallmentId,
//       amount: paid
//     });
//   }

//   // تحديث المجموعات
//   this.calculateTotals();
// }


// onPaidAmountChange(event: any, item: any) {
//   let value = Number(event.target.value) || 0;
  
//   // عدم السماح بالقيمة أكبر من المبلغ المستحق
//   if (value > item.amount) {
//     value = item.amount;
//     event.target.value = value;
//   }

//   // حفظ القيمة مباشرة في الـ item
//   item.paidAmount = value;

//   // إعادة حساب المجموعات
 

//   // تحديث قائمة العناصر المختارة
//   const index = this.itemChecked.findIndex(x => x.contractInstallmentId === item.contractInstallmentId);
//   if (index > -1) {
//     this.itemChecked[index].amount = value;
//   } else {
//     this.itemChecked.push({ contractInstallmentId: item.contractInstallmentId, amount: value });
//   }

//    this.calculateTotals();
// }


// onPaidAmountChange(event: any, item: any) {
//   let value = Number(event.target.value) || 0;

//   if (value > item.amount) {
//     value = item.amount;
//     event.target.value = value;
//   }

//   item.paidAmount = value;

//   const index = this.itemChecked.findIndex(x => x.contractInstallmentId === item.contractInstallmentId);
//   if (index > -1) {
//     this.itemChecked[index].amount = value;
//   } else {
//     this.itemChecked.push({ contractInstallmentId: item.contractInstallmentId, amount: value });
//   }

//   this.calculateTotals();
// }


onPaidAmountChange(event: any, item: any) {
  let value = Number(event.target.value) || 0;

  if (value > item.amount) {
    value = item.amount;
    event.target.value = value;
  }

  // حفظ القيمة مباشرة في الـ item
  item.paidAmount = value;

  // تحديث العناصر المختارة
  const index = this.itemChecked.findIndex(x => x.contractInstallmentId === item.contractInstallmentId);
  if (index > -1) {
    this.itemChecked[index].amount = value;
  } else {
    this.itemChecked.push({ contractInstallmentId: item.contractInstallmentId, amount: value });
  }

  this.calculateTotals();
}








checkDataItem(e:any,item:any){

  const checked=e.target.checked;
   const paid = Number(item.paidAmount || 0); // أو من input إذا موجود


  if(checked){
    // const amountDue = Number(item.amountDue) || 0;
   
    this.itemChecked.push({
      // contractInstallmentId:item.contractInstallmentId:item.contractInstallmentId,
      contractInstallmentId:item.contractInstallmentId,
      amount:paid
    })
    this.checksWrite=true
    // console.log("Elktorki")
  }else{
   this.itemChecked = this.itemChecked.filter(
  x => Number(x.contractInstallmentId) !== Number(item.id)
);

this.checksWrite=false;

  }

 

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
  .filter(x => Number(x.amount) > 0) // فقط العناصر المدفوعة
  .map(x => ({
    contractInstallmentId: x.contractInstallmentId,
    amount: x.amount

  }));


  console.log(this.itemChecked)
  console.log(data);
  

  if(this.btnAddandUpdate == 'add'){






  console.log("data.ownerPaymentDetails",data.ownerPaymentDetails)

    //  console.log(data);


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


// checkAllData(e:any){

//   const checked = e.target.checked;

//   if(checked){
//     this.oneCheckElement.forEach(element => {
//       element.nativeElement.checked = true;
//     });
//     this.itemChecked = this.paymentData.rows.map((item:any) => ({
//       contractInstallmentId: item.contractInstallmentId,
//       amount: item.amount
//     }));
//   }else{
//     this.oneCheckElement.forEach(element => {
//       element.nativeElement.checked = false;
//     });
//     this.itemChecked = [];
//   }


//   console.log(this.itemChecked)
  

// }


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

  console.log(this.itemChecked);
}



calculateTotals() {
  this.TotalAmountDue = 0;
  this.PaidTotalAmount = 0;
  this.RemainingTotalAmount = 0;

  this.paymentData.rows.forEach((item: any) => {
    item.remainingAmount = item.amount - item.paidAmount;

    this.TotalAmountDue += item.amount;
    this.PaidTotalAmount += item.paidAmount;
    this.RemainingTotalAmount += item.remainingAmount;

    // this.TotalAmountDue=this.TotalAmountDue.toFixed(2);
  });
}


getDataById(e:any){
  // console.log(val)
  this._ownerPaymentVoucherServices.getDataById(e.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.btnAddandUpdate = 'update';

      console.log('res', res);
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
     

      console.log("paymentVoucherForm",this.paymentVoucherForm.value)

      this.formDataSearch.patchValue({
        financiallyAccountId: res.debitAccountId,
        name: res.debitAccountName,
        email: res.email,
        mobile: res.mobile,
        nationalID: res.nationalID
      })
      console.log(this.formDataSearch.value);
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

      console.log(this.TotalAmountDue);


      this.itemChecked = res.listOwnerMonths
       .filter((item: any) => item.netPaidInThisVoucher > 0)
  .map((item:any) => ({
    contractInstallmentId: item.id,
    amount: item.amountDue
  }));


  console.log(this.itemChecked)




      
      this.idUpdate=res.id
      this.canBtnsShow=true
      console.log(this.idUpdate)

      

    });
  // })
}


isItemEditable(item: any): boolean {
  // return this.itemChecked.some(x => x.contractInstallmentId === item.id);
  return this.itemChecked.some(x => x.contractInstallmentId === item.contractInstallmentId);

}


ChangeSelect(e:any){
  console.log(e);

}



ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.editBehaviorSubject.clearId){
    this.editBehaviorSubject.clearId();
  }
}
}
