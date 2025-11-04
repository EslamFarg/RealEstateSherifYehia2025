import { Component, DestroyRef, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OwnerpaymentvoucherService } from '../services/ownerpaymentvoucher.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';

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



writePaidAmount(e:any,item:any){
  const paid = Number(e.target.value) || 0;
  let amountDue = Number(item.amountDue) || 0;

  if(this.checksWrite){
    this.itemChecked = this.itemChecked.filter(x => x.id != item.id);
    this.itemChecked.push({
      contractInstallmentId:item.id,
      amount:item.amountDue
    })
    
    // console.log(this.itemChecked);
  }
  


  if(paid > amountDue){
    e.target.value = amountDue;
    item.totalWithAmount = 0;
  }else{
    item.totalWithAmount = amountDue - paid
  
  setTimeout(() => {

    let TotalPaidAmount = 0;
    let calcTotalRemaining = 0;

    this.paidAmountElement?.forEach((el: ElementRef) => {
      const value = parseFloat(el.nativeElement.value) || 0;
      TotalPaidAmount += value;
    });
    this.PaidTotalAmount = TotalPaidAmount;

    this.remainingAmountElement?.forEach((el: ElementRef) => {
      const value = parseFloat(el.nativeElement.value) || 0;
      calcTotalRemaining += value;
    });
    this.RemainingTotalAmount = calcTotalRemaining;

  }, 0);

    
  }

  
  if(paid == 0){
    item.totalWithAmount = 0
  }

    // console.log(item.totalWithTax)

}




checkDataItem(e:any,item:any){

  const checked=e.target.checked;



  if(checked){
    this.itemChecked.push({
      contractInstallmentId:item.id,
      amount:item.amountDue
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
  // this._ownerPaymentVoucherServices.deleteData(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  //   this.toastr.show('تم حذف السند بنجاح','success');
  //   this.getAllDataVouchers();
  // })
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
  

  if(this.btnAddandUpdate == 'add'){

    // this.itemChecked.forEach((item) => {
    //   data.ownerPaymentDetails.push(item)
    //  console.log(data.ownerPaymentDetails)
    // })
    data.ownerPaymentDetails = this.itemChecked.map(x => ({
  contractInstallmentId: x.contractInstallmentId,
  amount: x.amount 
}));


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
       ownerPaymentDetails: this.itemChecked.map(item => ({
    contractInstallmentId: item.contractInstallmentId,
    amount: item.amount
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


checkAllData(e:any){

  const checked = e.target.checked;

  if(checked){
    this.oneCheckElement.forEach(element => {
      element.nativeElement.checked = true;
    });
    this.itemChecked = this.paymentData.rows.map((item:any) => ({
      contractInstallmentId: item.contractInstallmentId,
      amount: item.amount
    }));
  }else{
    this.oneCheckElement.forEach(element => {
      element.nativeElement.checked = false;
    });
    this.itemChecked = [];
  }


  console.log(this.itemChecked)
  

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
        creditAccountId: res.creditAccountId
      });
     

      this.formDataSearch.patchValue({
        financiallyAccountId: res.ownerId,
        name: res.debitAccountName,
        email: res.email,
        mobile: res.mobile,
        nationalID: res.nationalID
      })
      console.log(this.formDataSearch.value);
      // table
      this.paymentData = {
        rows: res.ownerPaymentDetails.map((item: any) => ({
          contractId: item.contractId,
          propertyName: item.propertyName,
          unitName: item.unitName,
          monthNumber: item.monthNumber,
          amount:item.amount,
          paidAmount: item.paidAmount
        }))
      };

      this.paymentData.rows.forEach((item: any) => {
        item.remainingAmount = item.amount - item.paidAmount;

      })

      this.itemChecked = res.ownerPaymentDetails.map((item: any) => ({
        contractInstallmentId: item.contractInstallmentId,
        amount: item.amount
      }));


    

      
      this.idUpdate=res.id
      this.canBtnsShow=true
      console.log(this.idUpdate)
      setTimeout(() => {
        this.TotalAmountDue=0
       
          this.checkAll.nativeElement.checked = true;
        this.oneCheckElement.forEach(cb => cb.nativeElement.checked = true);
        this.amountDueElement?.forEach((item)=>{
          this.TotalAmountDue+=Number(item.nativeElement.textContent)
        })

      },100);

      

    });
  // })
}




}
