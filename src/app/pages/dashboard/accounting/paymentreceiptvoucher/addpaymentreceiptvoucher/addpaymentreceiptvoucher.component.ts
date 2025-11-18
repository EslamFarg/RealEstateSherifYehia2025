import { Component, DestroyRef, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { paymentreceiptvoucherService } from '../services/paymentrecipt.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';

@Component({
  selector: 'app-addpaymentreceiptvoucher',
  templateUrl: './addpaymentreceiptvoucher.component.html',
  styleUrl: './addpaymentreceiptvoucher.component.scss'
})
export class AddpaymentreceiptvoucherComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Serivces
  fb:FormBuilder=inject(FormBuilder)
  _accountsServices:AccountService=inject(AccountService)
  _TenantServices:paymentreceiptvoucherService=inject(paymentreceiptvoucherService)
  EditBehaviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService)
  dataFilter=[
    {
      id:0,
      name:'رقم العقد'
    },
    {
      id:1,
      name:'اسم المستاجر'

    },
    {
      id:2,
      name:'اسم الوحده'

    }
  ]

  destroyRef:DestroyRef=inject(DestroyRef);
  accountData:any[]=[];  
  ContractId:any
  toastr:ToastrService=inject(ToastrService)

  btnAddandUpdate='add'

  allMothes:any=['','يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر']
  getMonthes:any=[]
  activeIndex: number | null = null;
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property

  PaymentReceiptVoucherForm=this.fb.group({
    
  voucherNo: ['',[Validators.required,Validators.minLength(3)]],
  voucherDate: [new Date().toISOString().split('T')[0],[Validators.required]],
  paymentMethod: ['cash',[Validators.required]],
  amount: [0,[Validators.required]],
  notes: [''],
  contractId: [0,Validators.required],
  tenantId: [0,Validators.required],
  debitAccountId: [null,[Validators.required]],
  creditAccountId: [null,[Validators.required]],
tenantReceiptVoucherDetails:this.fb.array([])
  })


  





  formSearchData=this.fb.group({
    numbercontract:[''],
    nameTenant:[''],
    unitName:[''],
    propertyName:[''],
    endDate:[''],
    amountDue:['']

  })


@ViewChild('monthsContainer') monthsContainer!:ElementRef;
idUpdate:any
@ViewChild('numberVoucher') numberVoucher!:ElementRef
showDelete:any=false;
deleteId:any
@ViewChild('valSearchById') valSearch!:ElementRef;
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Method
  
  
  ngOnInit(): void {
    
    this.EditBehaviorServices.idSubscribe.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((id)=>{
      if(id){
        this.btnAddandUpdate='update';
        this.idUpdate=id;
        this._TenantServices.searchById(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
          console.log("REs",res);
           this.PaymentReceiptVoucherForm.patchValue({
        voucherNo: res.voucherNo,
        voucherDate: res.voucherDate.split('T')[0],
        paymentMethod: res.paymentMethod,
        notes: res.notes,
        contractId: res.contractId,
        tenantId: res.tenantId,
        debitAccountId: res.debitAccountId,
        creditAccountId: res.creditAccountId
      });
      this.formSearchData.patchValue({
         numbercontract: res.id,
    nameTenant: res.creditAccountName,
    unitName: res.unitName,
    propertyName:res.propertyName,
    endDate:res.contractLeaseEndDate,
    amountDue:res.netContract
  
  })


  this.idUpdate=res.id;
      // ✅ reset قبل تحميل البيانات
      this.getTotalAmount = 0;
      this.activeIndexes = [];
      this.activeDataSelected = [];
      this.voucherDetails.clear();

      // ✅ تحميل الشهور
      this.getMonthes = res.tenantReceiptVoucherDetails;

      // ✅ تجهيز الشهور المختارة مسبقاً
      this.getMonthes.forEach((monthItem: any, idx: number) => {

        this.activeIndexes.push(idx);

        const selectedMonth = {
          contractInstallmentId: monthItem.contractInstallmentId,
          remainingAmount: monthItem.amount
        };

        this.activeDataSelected.push(selectedMonth);

        this.voucherDetails.push(
          this.fb.group({
            contractInstallmentId: selectedMonth.contractInstallmentId,
            amount: selectedMonth.remainingAmount
          })
        );

        // ✅ جمع قيمة الشهر 
        this.getTotalAmount += selectedMonth.remainingAmount;

      });

      // ✅ تحديث قيمة المبلغ
      this.PaymentReceiptVoucherForm.get('amount')?.setValue(this.getTotalAmount);

      // تعديل الحالة → Update
      this.btnAddandUpdate = 'update';
        })
      }
    })
    this.getAllDataAccounts();
    this.getAllMonthes();
  }


  getAllDataAccounts(){
    this._accountsServices.getAllData({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      this.accountData = res.rows;
    })
  }


  selectFilterData(e:any){
    console.log(e);
    if(!e || !e.value){return;}

    let ShapeSearch={
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  },
  "searchFilter": {
    "column": 0,
    "value": e.value
  }
}



    if(e.index == 0){
      ShapeSearch.searchFilter.column=0
    }else if(e.index == 1){
      ShapeSearch.searchFilter.column=1
      
    }else if(e.index == 2){
      ShapeSearch.searchFilter.column=7
    }


    this._TenantServices.searchContracts(ShapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{


      if(!res.rows.length || !res.rows || !res){
        this.PaymentReceiptVoucherForm.reset();
        this.formSearchData.reset();
        this.PaymentReceiptVoucherForm.patchValue({
          voucherDate:new Date().toISOString().split('T')[0]
        })
        return
      }

      console.log(res);
      this.PaymentReceiptVoucherForm.patchValue({
        contractId:res.rows[0].id,
        creditAccountId:res.rows[0].financialTenantId,
        tenantId:res.rows[0].tenantId
      })

      this.formSearchData.patchValue({
        numbercontract:res.rows[0].id,
        nameTenant:res.rows[0].tenantName,
        unitName:res.rows[0].unitName,
        endDate:res.rows[0].leaseEndDate,
        propertyName:res.rows[0].propertyName,
        amountDue:res.rows[0].totalAmount
      })

      console.log(this.PaymentReceiptVoucherForm.value);

      this.ContractId=res.rows[0].id
      this.getAllMonthes();


    })


  }



  getAllMonthes(){
    if(this.ContractId){
 this._TenantServices.getAllMonths(this.ContractId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
      // console.log(res);
      this.getMonthes=res.rows;
      console.log("GETMonths",this.getMonthes)
    })
    }
   
  }


  prevMonth(){
    this.monthsContainer.nativeElement.scrollBy({
      left:-100,
      behavior:'smooth'
    })
  }

  nextMonth(){
    this.monthsContainer.nativeElement.scrollBy({
      left:100,
      behavior:'smooth'
    })
  }


// activeIndexes: number[] = [];
// activeDataSelected:any=[]
// getTotalAmount=0
// toggleActive(index: number,item:any) {
//   const pos = this.activeIndexes.indexOf(index);

//   if (pos > -1) {
//     this.activeIndexes.splice(pos, 1);
//     this.activeDataSelected.forEach((element:any) => {
//       this.getTotalAmount-=element.remainingAmount
//     })
//     this.activeDataSelected.splice(pos,1)
   
//     console.log(this.getTotalAmount)
//   }else {
//     this.activeIndexes.push(index);
//     console.log(item);
//     this.activeDataSelected.push({
//       contractInstallmentId:item.contractId,
//       remainingAmount:item.remainingAmount
//     })

//     this.activeDataSelected.forEach((element:any) => {
//       this.getTotalAmount+=element.remainingAmount
//     })
//     this.PaymentReceiptVoucherForm.patchValue({
//       amount:this.getTotalAmount
//     })
//   }
// }


activeIndexes: number[] = [];
activeDataSelected: any[] = [];
getTotalAmount: number = 0;

// toggleActive(index: number, item: any) {

//   const pos = this.activeIndexes.indexOf(index);

//   if (pos > -1) {
//     // إزالة
//     this.activeIndexes.splice(pos, 1);
//     this.activeDataSelected.splice(pos, 1);
//         this.voucherDetails.removeAt(pos);

//   } else {
//     // إضافة
//     this.activeIndexes.push(index);
//     this.activeDataSelected.push({
//       contractInstallmentId: item.id,   // ✅ هذا الصحيح
//       remainingAmount: item.remainingAmount ?? 0           // ✅ حماية لو undefined
//     });

//        this.voucherDetails.push(
//       this.fb.group({
//         contractInstallmentId: item.id,
//         amount: item.remainingAmount
//       })
//     );
//   }

//   this.getTotalAmount = this.activeDataSelected.reduce(
//     (sum, x) => sum + x.remainingAmount,
//     0
//   );

//   this.PaymentReceiptVoucherForm.patchValue({
//     amount: this.getTotalAmount
//   });

//   console.log("Selected:", this.activeDataSelected);
//   console.log("Total:", this.getTotalAmount);
// }



toggleActive(index: number, item: any) {
  const pos = this.activeIndexes.indexOf(index);

  if (pos > -1) {
    // إزالة
    const removedItem = this.activeDataSelected.splice(pos, 1)[0];
    this.activeIndexes.splice(pos, 1);
    this.voucherDetails.removeAt(pos);
    this.getTotalAmount -= removedItem.remainingAmount;

  } else {
    // إضافة
    const newItem = {
      contractInstallmentId: item.contractInstallmentId,
      remainingAmount: item.remainingAmount ?? item.amount ?? 0
    };

    this.activeIndexes.push(index);
    this.activeDataSelected.push(newItem);

    this.voucherDetails.push(
      this.fb.group({
        contractInstallmentId: newItem.contractInstallmentId,
        amount: newItem.remainingAmount
      })
    );

    this.getTotalAmount += newItem.remainingAmount;
  }

  // تحديث قيمة المبلغ
  this.PaymentReceiptVoucherForm.patchValue({
    amount: this.getTotalAmount
  });
}


get voucherDetails() {
  return this.PaymentReceiptVoucherForm.get('tenantReceiptVoucherDetails') as any;
}

@ViewChildren('getMothesElement') getMothesElement!: QueryList<ElementRef>;

onSubmit(){


  
    let contractId=this.PaymentReceiptVoucherForm.get('contractId')?.value ?? ''
    let creditAccountId=this.PaymentReceiptVoucherForm.get('creditAccountId')?.value ?? '';
    let tenantId=this.PaymentReceiptVoucherForm.get('tenantId')?.value ?? '';
    let tenantReceiptVoucherDetails=this.PaymentReceiptVoucherForm.get('tenantReceiptVoucherDetails')?.value ??  [];

   
    if(!contractId || !creditAccountId || !tenantId){
      this.toastr.show('برجاء البحث اولا','error');
      return ; 
    }


   
let data={
  voucherNo:this.PaymentReceiptVoucherForm.get('voucherNo')?.value,
  voucherDate:this.PaymentReceiptVoucherForm.get('voucherDate')?.value,
  paymentMethod: this.PaymentReceiptVoucherForm.get('paymentMethod')?.value,
  amount: this.PaymentReceiptVoucherForm.get('amount')?.value,
  notes: this.PaymentReceiptVoucherForm.get('notes')?.value,
  contractId: this.PaymentReceiptVoucherForm.get('contractId')?.value,
  tenantId: this.PaymentReceiptVoucherForm.get('tenantId')?.value,
  debitAccountId: this.PaymentReceiptVoucherForm.get('debitAccountId')?.value,
  creditAccountId: this.PaymentReceiptVoucherForm.get('creditAccountId')?.value,
  tenantReceiptVoucherDetails: this.activeDataSelected.map(x => ({
    contractInstallmentId: x.contractInstallmentId,
    amount: x.remainingAmount
  }))
}

  if(this.PaymentReceiptVoucherForm.valid){
    if(this.btnAddandUpdate == 'add'){
      this._TenantServices.createData(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        this.toastr.show('تم حفظ البيانات بنجاح','success');
        this.idUpdate=res;
        // console.log(this.idUpdate);
        this.numberVoucher.nativeElement.value=res;
        this.btnAddandUpdate='update';
      })
    }else{
      // update 

      let dataUpdate={
        id:this.idUpdate,
        ...data,
      }
      this._TenantServices.updateData(dataUpdate).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        this.toastr.show('تم تحديث البيانات بنجاح','success');  
        // this.PaymentReceiptVoucherForm.reset();
        
      })
    }
    
  
  }else{
    this.PaymentReceiptVoucherForm.markAllAsTouched();
  }
}


// searchById(valSearchById:any){
//   const id=valSearchById.value;
//   if(id){
//     this._TenantServices.searchById(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
//       console.log(res);
//       this.PaymentReceiptVoucherForm.patchValue({
//         voucherNo: res.voucherNo,
//         voucherDate: res.voucherDate.split('T')[0],
//         paymentMethod: res.paymentMethod,
//         amount: res.net,
//         notes: res.notes,
//         contractId: res.contractId,
//         tenantId: res.tenantId,
//         debitAccountId: res.debitAccountId,
//         creditAccountId: res.creditAccountId
//       });
//       this.activeDataSelected.push(...res.tenantReceiptVoucherDetails);
//       this.getMonthes=res.tenantReceiptVoucherDetails;
//       this.PaymentReceiptVoucherForm.get('amount')?.setValue(this.getTotalAmount);
//       this.getTotalAmount=res.net;
//       this.PaymentReceiptVoucherForm.get('tenantReceiptVoucherDetails')?.setValue([]);
//       this.btnAddandUpdate='update';
//       // this.activeIndexes=this.activeDataSelected.length
    
//         this.activeIndexes=[]
//       this.getMonthes.forEach((monthItem: any, idx: number) => {
//   const found = this.activeDataSelected.some(
//     (x: any) => x.contractInstallmentId === monthItem.contractInstallmentId
//   );
//   if (found) {
//     this.activeIndexes.push(idx);
//   }
// });

//     })



//   }else{
//     this.toastr.show('برجاء ادخال رقم السند','error');
//   }

// }


searchById(valSearchById: any) {
  const id = valSearchById.value;

  if (!id) {
    this.toastr.show('برجاء ادخال رقم السند', 'error');
    return;
  }

  this._TenantServices.searchById(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {
        console.log(res);
      // ✅ تعبئة الفورم
      this.PaymentReceiptVoucherForm.patchValue({
        voucherNo: res.voucherNo,
        voucherDate: res.voucherDate.split('T')[0],
        paymentMethod: res.paymentMethod,
        notes: res.notes,
        contractId: res.contractId,
        tenantId: res.tenantId,
        debitAccountId: res.debitAccountId,
        creditAccountId: res.creditAccountId
      });
      this.formSearchData.patchValue({
         numbercontract: res.id,
    nameTenant: res.creditAccountName,
    unitName: res.unitName,
    propertyName:res.propertyName,
    endDate:res.contractLeaseEndDate,
    amountDue:res.netContract
  
  })


  this.idUpdate=res.id;
      // ✅ reset قبل تحميل البيانات
      this.getTotalAmount = 0;
      this.activeIndexes = [];
      this.activeDataSelected = [];
      this.voucherDetails.clear();

      // ✅ تحميل الشهور
      this.getMonthes = res.tenantReceiptVoucherDetails;

      // ✅ تجهيز الشهور المختارة مسبقاً
      this.getMonthes.forEach((monthItem: any, idx: number) => {

        this.activeIndexes.push(idx);

        const selectedMonth = {
          contractInstallmentId: monthItem.contractInstallmentId,
          remainingAmount: monthItem.amount
        };

        this.activeDataSelected.push(selectedMonth);

        this.voucherDetails.push(
          this.fb.group({
            contractInstallmentId: selectedMonth.contractInstallmentId,
            amount: selectedMonth.remainingAmount
          })
        );

        // ✅ جمع قيمة الشهر 
        this.getTotalAmount += selectedMonth.remainingAmount;

      });

      // ✅ تحديث قيمة المبلغ
      this.PaymentReceiptVoucherForm.get('amount')?.setValue(this.getTotalAmount);

      // تعديل الحالة → Update
      this.btnAddandUpdate = 'update';
    });
}

showDeletePopup(){
  this.showDelete=true
  this.deleteId=this.idUpdate
}
onClose(){
  this.showDelete=false
}
deleteConfirmed(e:any){
  this.showDelete=false;


  this._TenantServices.deleteData(e).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف السند بنجاح','success');
    // this.ge();
    this.resetForm();
  })

}


resetForm() {

  // ✅ 1) reset الفورم الأساسي
  this.PaymentReceiptVoucherForm.reset({
    voucherNo: '',
    voucherDate: '',
    paymentMethod: 'cash',
    amount: 0,
    notes: '',
    contractId: 0,
    tenantId: 0,
    debitAccountId: null,
    creditAccountId: null
  });

  // ✅ 2) reset search form
  this.formSearchData.reset({
    numbercontract: '',
    nameTenant: '',
    unitName: '',
    propertyName: '',
    endDate: '',
    amountDue: ''
  });

  // ✅ 3) تنظيف FormArray
  this.voucherDetails.clear();

  // ✅ 4) تنظيف البيانات المتعلقة بالشهور
  this.activeIndexes = [];
  this.activeDataSelected = [];
  this.getMonthes = [];
  this.getTotalAmount = 0;

  // ✅ 5) إعادة الضبط لوضع الإضافة
  this.btnAddandUpdate = 'add';
  this.idUpdate = null;

  // ✅ 6) تنظيف حقل رقم السند في الـ DOM لو موجود
  if (this.numberVoucher) {
    this.numberVoucher.nativeElement.value = '';
  }

  this.valSearch.nativeElement.value = '';
  // ✅ 7) تنظيف ContractId حتى لا يعيد الشهور القديمة
  this.ContractId = null;

  console.log("✅ تم عمل Reset كامل");
}



ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(this.EditBehaviorServices.clearId){
    this.EditBehaviorServices.clearId();
  }
}

}
