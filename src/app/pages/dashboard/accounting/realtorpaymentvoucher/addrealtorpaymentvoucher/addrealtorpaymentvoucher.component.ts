import { Component, DestroyRef, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Realtor } from '../../../main/realtor/models/realtor';
import { RealtorService } from '../../../main/realtor/services/realtor.service';
import { RealtorpaymentvoucherService } from '../services/realtorpaymentvoucher.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';

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



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties





  toastr:ToastrService=inject(ToastrService);
  realtorPaymentVoucherForm=this.fb.group({
  voucherNo: ['',Validators.required,Validators.minLength(3)],
  voucherDate: ['',Validators.required],
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

formDataSearch=this.fb.group({
  financiallyAccountId:[null,Validators.required],
  name:[''],
  email:[''],
  mobile:[''],
  nationalID:[''],
})


accountData:any;
itemsChecked: any[] = [];
getAllDataSearch:any
FilterData=[
  {id:1,name:'اسم السمسار'},
  {id:1,name:'رقم الجوال'},
  {id:1,name:'رقم الهويه'},
]
  

   paymentData = [
  { id: 1, contractNumber: "C-1001", property: "عمارة الورد", unit: "شقة 101", month: "يناير", amount: "4,000 ريال", paid: "3,000 ريال", tax: "600 ريال", remaining: "1,000 ريال" },
  { id: 2, contractNumber: "C-1002", property: "برج السلام", unit: "مكتب 203", month: "فبراير", amount: "5,500 ريال", paid: "5,000 ريال", tax: "750 ريال", remaining: "500 ريال" },
  { id: 3, contractNumber: "C-1003", property: "فيلا النخيل", unit: "الوحدة A1", month: "مارس", amount: "7,000 ريال", paid: "7,000 ريال", tax: "1,050 ريال", remaining: "0 ريال" },
  { id: 4, contractNumber: "C-1004", property: "عمارة الرياض", unit: "شقة 202", month: "أبريل", amount: "3,800 ريال", paid: "2,800 ريال", tax: "570 ريال", remaining: "1,000 ريال" },
  { id: 5, contractNumber: "C-1005", property: "برج الماسة", unit: "مكتب 505", month: "مايو", amount: "6,200 ريال", paid: "5,000 ريال", tax: "930 ريال", remaining: "1,200 ريال" },
  { id: 6, contractNumber: "C-1006", property: "عمارة الخليج", unit: "شقة 303", month: "يونيو", amount: "4,500 ريال", paid: "4,500 ريال", tax: "675 ريال", remaining: "0 ريال" },
  { id: 7, contractNumber: "C-1007", property: "برج اليمامة", unit: "مكتب 1101", month: "يوليو", amount: "8,000 ريال", paid: "7,000 ريال", tax: "1,200 ريال", remaining: "1,000 ريال" },
  { id: 8, contractNumber: "C-1008", property: "عمارة النور", unit: "شقة 102", month: "أغسطس", amount: "3,600 ريال", paid: "3,000 ريال", tax: "540 ريال", remaining: "600 ريال" },
  { id: 9, contractNumber: "C-1009", property: "فيلا الرفاه", unit: "الوحدة B2", month: "سبتمبر", amount: "9,000 ريال", paid: "8,500 ريال", tax: "1,350 ريال", remaining: "500 ريال" },
  { id: 10, contractNumber: "C-1010", property: "برج السحاب", unit: "مكتب 210", month: "أكتوبر", amount: "5,200 ريال", paid: "4,200 ريال", tax: "780 ريال", remaining: "1,000 ريال" },
  { id: 11, contractNumber: "C-1011", property: "عمارة النسيم", unit: "شقة 401", month: "نوفمبر", amount: "3,900 ريال", paid: "3,400 ريال", tax: "585 ريال", remaining: "500 ريال" },
  { id: 12, contractNumber: "C-1012", property: "برج الرياض", unit: "مكتب 608", month: "ديسمبر", amount: "6,800 ريال", paid: "6,000 ريال", tax: "1,020 ريال", remaining: "800 ريال" },
  { id: 13, contractNumber: "C-1013", property: "فيلا الورود", unit: "الوحدة C3", month: "يناير", amount: "7,500 ريال", paid: "6,500 ريال", tax: "1,125 ريال", remaining: "1,000 ريال" },
  { id: 14, contractNumber: "C-1014", property: "عمارة الخليج", unit: "شقة 105", month: "فبراير", amount: "4,200 ريال", paid: "3,700 ريال", tax: "630 ريال", remaining: "500 ريال" },
  { id: 15, contractNumber: "C-1015", property: "برج المملكة", unit: "مكتب 301", month: "مارس", amount: "10,000 ريال", paid: "9,000 ريال", tax: "1,500 ريال", remaining: "1,000 ريال" },
  { id: 16, contractNumber: "C-1016", property: "عمارة النخيل", unit: "شقة 206", month: "أبريل", amount: "3,500 ريال", paid: "3,000 ريال", tax: "525 ريال", remaining: "500 ريال" },
  { id: 17, contractNumber: "C-1017", property: "برج القصر", unit: "مكتب 1203", month: "مايو", amount: "6,000 ريال", paid: "5,000 ريال", tax: "900 ريال", remaining: "1,000 ريال" },
  { id: 18, contractNumber: "C-1018", property: "عمارة الزهراء", unit: "شقة 307", month: "يونيو", amount: "4,800 ريال", paid: "4,000 ريال", tax: "720 ريال", remaining: "800 ريال" },
  { id: 19, contractNumber: "C-1019", property: "برج التميز", unit: "مكتب 405", month: "يوليو", amount: "5,700 ريال", paid: "5,000 ريال", tax: "855 ريال", remaining: "700 ريال" },
  { id: 20, contractNumber: "C-1020", property: "فيلا الأفق", unit: "الوحدة D4", month: "أغسطس", amount: "8,500 ريال", paid: "8,000 ريال", tax: "1,275 ريال", remaining: "500 ريال" }
];



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


ngOnInit(){
  this.getAllAccounts();
}
onSubmit(){
  if(this.realtorPaymentVoucherForm.valid){
    if(this.formDataSearch.get('financiallyAccountId')?.value == null || this.formDataSearch.get('financiallyAccountId')?.value == undefined){
      this.toastr.show('يرجى تحديد حساب','error');
      return ; 
    }

    let data={
  voucherNo: this.realtorPaymentVoucherForm.get('voucherNo')?.value,
  voucherDate: this.realtorPaymentVoucherForm.get('voucherDate')?.value,
  paymentMethod: this.realtorPaymentVoucherForm.get('paymentMethod')?.value,
  amount: this.realtorPaymentVoucherForm.get('amount')?.value,
  notes: this.realtorPaymentVoucherForm.get('notes')?.value,
  brokerId: this.realtorPaymentVoucherForm.get('brokerId')?.value,
  debitAccountId: this.formDataSearch.get('financiallyAccountId')?.value,
  creditAccountId: this.realtorPaymentVoucherForm.get('creditAccountId')?.value,
  brokerPaymentVoucherDetails:[] as { contractId: number; amount: number }[]  
}

this.itemsChecked.forEach((item) => {
  data.brokerPaymentVoucherDetails.push({
    contractId: item.contractId,
    amount: item.paidAmount
  });
})



console.log(data);

  }else{
    this.realtorPaymentVoucherForm.markAllAsTouched();
  }
}




getAllAccounts(){
this._accountsService.getAllData({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
  this.accountData = res.rows;
})
}





SearchFilter(e:any){


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
  
  // console.log(e);

  if(e.index == 0){
    ShapeDataFilter.searchFilter.column=1
  }else if(e.index == 1){
    ShapeDataFilter.searchFilter.column=3
    
  }else if(e.index == 2){
    ShapeDataFilter.searchFilter.column=2
  }



  this._realtorPaymentVoucherServices.searchBroker(ShapeDataFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    // this.getAllDataSearch=res.rows;
    const row=res.rows[0];

    if(res.rows && res.rows.length > 0){
      this.formDataSearch.patchValue(row);
      this.idSearchRealtor=row.id;
      this.realtorPaymentVoucherForm.get('brokerId')?.setValue(row.id);
      console.log(this.idSearchRealtor);
      // console.log(this.formDataSearch.value);
      let pagination={
  paginationInfo: {
    pageIndex: 0,
    pageSize: 0
  }
}

      this._realtorPaymentVoucherServices.searchBrokerCommissions(this.idSearchRealtor,pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        this.getAllDataSearch=res
        // console.log(res)
        // console.log(this.getAllDataSearch)
      })


    }

    console.log(this.getAllDataSearch);
    
  })


  }


// get TotalBrokerCommission() {
//       this.getAllDataSearch.rows.reduce((acc:any,curr:any)=>{
//         return acc + curr.brokerCommission
//       },0)
//   }

get TotalBrokerCommission(): number {
  if (!this.getAllDataSearch || !this.getAllDataSearch.rows) return 0;

  return this.getAllDataSearch.rows.reduce(
    (acc: number, curr: any) => acc + (curr.brokerCommission || 0),
    0
  );
}



@ViewChildren('rowCheckbox') checkboxes!: QueryList<ElementRef>

PaidAmount: number = 0;
@ViewChildren('paidAmount') paidAmountElement!:QueryList<ElementRef>
onPaidChange(event: any, item: any) {
   let value = parseFloat(event.target.value) || 0;
  if (value > item.brokerCommission) {
    // event.target.value = item.brokerCommission;
     value = item.brokerCommission;
    event.target.value = value;
  }

  // item.remainingAmount = item.brokerCommission - event.target.value;

    item.brokerPaidAmount = value;
  item.remainingAmount = item.brokerCommission - value;


  // Tot

}






checkDataId(event:any,item:any){
   const isChecked = event.target.checked;

  if (isChecked) {
    // ✅ لو اتعلم عليه — ضيفه أو حدّثه
    const existing = this.itemsChecked.find(x => x.contractId === item.contractId);

    if (existing) {
      existing.paidAmount = item.brokerPaidAmount || 0;
    } else {
      this.itemsChecked.push({
        contractId: item.contractId,
        paidAmount: item.brokerPaidAmount || 0
      });
    }
  } else {
    // ❌ لو اتشال منه الصح — امسحه من المصفوفة
    this.itemsChecked = this.itemsChecked.filter(x => x.contractId !== item.contractId);
  }

  // console.log(this.itemsChecked);

 
  console.log(this.itemsChecked);

}



selectAllChecked(e:any){
  const isChecked=e.target.checked
  // console.log(e.target.checked);

  if(isChecked){
    this.itemsChecked=this.getAllDataSearch.rows
      this.checkboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = true;
    });
    
  }else{
    this.itemsChecked=[]
      this.checkboxes.forEach((checkbox) => {
      checkbox.nativeElement.checked = false;
    });
  }

  console.log(this.itemsChecked);

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
}






