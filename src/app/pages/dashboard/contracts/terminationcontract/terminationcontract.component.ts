import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { EditBehaviorServiceService } from '../../../../shared/services/edit-behavior-service.service';
import { TerminationcontractService } from './services/terminationcontract.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../../accounting/accounts/services/account.service';
import { MessageformsService } from '../../messages/messageforms/services/messageforms.service';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-terminationcontract',
  templateUrl: './terminationcontract.component.html',
  styleUrl: './terminationcontract.component.scss'
})
export class TerminationcontractComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111 Services 
_editBehaviorService:EditBehaviorServiceService=inject(EditBehaviorServiceService)
_terminationContractService:TerminationcontractService=inject(TerminationcontractService)
destroyRef:DestroyRef=inject(DestroyRef)

 fb:FormBuilder = inject(FormBuilder);
 accountServices:AccountService=inject(AccountService)
  form: any;
 messageTemplateServices: MessageformsService=inject(MessageformsService);
 toastr:ToastrService=inject(ToastrService)

 isVisiablePrint=false
 getDataPrint:any
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Properties





  contractData: any;
  accountData:any;
  router:Router=inject(Router)

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


monthsArabic:any=[
  'يناير',
  'فبراير',
  'مارس',
  'ابريل',
  'مايو',
  'يونيو',
  'يوليو',
  'اغسطس',
  'سبتمبر',
  'اكتوبر',
  'نوفمبر',
  'ديسمبر'
]

monthsBetween: string[] = [];

generateMonthsBetween(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const temp = new Date(start);

  this.monthsBetween = [];

  while (temp <= end) {
    const monthName = this.monthsArabic[temp.getMonth()];
    const year = temp.getFullYear();
    this.monthsBetween.push(`${monthName} ${year}`);

    temp.setMonth(temp.getMonth() + 1);
  }
}


endMonthIndex:any
endYear:any

ngOnInit(): void {
  this.accountDataFetch();
  this.getMessageTemplateDetails();



   this.form = this.fb.group({

      // ✅ معلومات العقد
      contractNumber: [''],
      contractPlace:[''],
      contractDate: [''],
      leaseStartDate: [''],
      leaseEndDate: [''],
      leaseMonths: [''],
   

      // // ✅ بيانات المستأجر
        tenantName: [''],
      tenantPhone: [''],
      tenantNationality: [''],
      tenantIdNumber: [''],
      tenantemail: [''],
      tenantnationalID: [''],
      tenantdependants: [''],

      // // ✅ بيانات الوحدة / العقار
     propertyName: [''],
floorNumber: [''],
name: [''],
city: [''],
district: [''],
street: [''],

      // // ✅ بيانات السمسار
      brokerName: [''],
      brokerPhone: [''],
     brokerNationalId:[''],

   contractValue: [''],
      totalAmount: [''],
      taxAmount: [''],
      brokerCommission: [''],
      otherCommission: [''],
      insuranceValue: [''],
      netAmount: [''],



            refundedMonths: [''],
      refundTax: [''],
      refundInsuranceValue: [''],
      refundNet: [''],
      paymentMethod: [''],


    

    
      // // ✅ الرسائل
      messageId: [''],
      messageText: [''],
      sendBeforeAfter:[''],
      useWhatsApp:[''],
      useEmail:[''],
      useSms:[''],

     
      // // ✅ مرفقات
      // attachments: [this.contractData.attachments || []]
    });

  
  this._editBehaviorService.idSubscribe.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    if(res){

   
      this.endMonthIndex=res.endMonthIndex;
      this.endYear=res.endYear;

      this._terminationContractService.GetRefund(res.contractId,res.endMonthIndex,res.endYear).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res)=>{
        console.log(res);
         if(!res) return ;
          this.contractData = res;  // يجي من الباك API

          this.getDataPrint=res


          this.generateMonthsBetween(
  this.contractData.leaseStartDate,
  this.contractData.leaseEndDate
);

        // 2) بناء FormGroup بعد وصول البيانات
        this.buildForm();
      })


    }else{
      // Redirect to another page

      this.router.navigate(['/dashboard/querycontract']);
    }
  })

   
}

originalRefundNet:number=0;


updateRefundNet(){
  const refundInsuranceValue= Number(this.form.get('refundInsuranceValue')?.value);
  // const refundNet= this.form.get('refundNet')?.value;
  const totalRefundNet= this.originalRefundNet + refundInsuranceValue;


  this.form.get('refundNet')?.patchValue(totalRefundNet,{emitEvent:false});
}

  buildForm() {

    this.form = this.fb.group({

      // ✅ معلومات العقد
      contractNumber: this.contractData.id,
      contractPlace:this.contractData.contractPlace,
      contractDate: this.contractData.contractDate,
      leaseStartDate: this.contractData.leaseStartDate,
      leaseEndDate: this.contractData.leaseEndDate,
      leaseMonths: this.contractData.leaseMonths,
      

      // ✅ بيانات المستأجر
      tenantId: this.contractData.tenant?.id,
      financiallyAccountId: this.contractData.tenant?.financiallyAccountId,
      tenantName: this.contractData.tenant?.name,
      tenantPhone: this.contractData.tenant?.mobile,
      tenantNationality: this.contractData.tenant?.nationality,
      tenantIdNumber: this.contractData.tenant?.id,
      tenantemail: this.contractData.tenant?.email,
      tenantnationalID: this.contractData.tenant?.email,
      tenantdependants: this.contractData.tenant?.dependants.length,

      // ✅ بيانات الوحدة / العقار
     propertyName: this.contractData?.unit.propertyName,
floorNumber: this.contractData?.unit.floorNumber,
name: this.contractData?.unit.name,
city: this.contractData?.unit.city,
district: this.contractData?.unit.district,
street: this.contractData?.unit.street,
      // ✅ بيانات السمسار
      brokerName: this.contractData.broker?.name,
      brokerPhone: this.contractData.broker?.mobile,
      brokerNationalId: this.contractData.broker?.nationalID,

      // ✅ المالية
      contractValue: this.contractData.financial?.contractValue,
      totalAmount: this.contractData.financial?.totalAmount,
      taxAmount: this.contractData.financial?.taxAmount,
      brokerCommission: this.contractData.financial?.brokerCommission,
      otherCommission: this.contractData.financial?.otherCommission,
      insuranceValue: this.contractData.financial?.insuranceValue,
      netAmount: this.contractData.financial?.netAmount,



    


      // ✅ المبالغ المسترجعة (Editable)
      
      refundedMonths: this.contractData.refundedMonths,
      refundTax: this.contractData.refundTax,
      refundInsuranceValue: this.contractData.refundInsuranceValue,
      refundNet: this.contractData.refundNet,

      // ✅ طريقة الدفع
      paymentMethod: this.contractData.paymentMethod,

      // ✅ الرسائل
      messageId: this.contractData.messageId,
      messageText: this.contractData.messageText,

       
      sendBeforeAfter:this.contractData.sendBeforeAfter,
    
      // ✅ طرق الإرسال
      useSms: this.contractData.useSms,
      useWhatsApp: this.contractData.useWhatsApp,
      useEmail: this.contractData.useEmail,

      // ✅ مرفقات
      attachments: [this.contractData.attachments || []]
    });

    this.originalRefundNet = Number(this.contractData.refundNet) || 0;

     this.form.get('refundInsuranceValue')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(()=>{
    this.updateRefundNet();
  })
  }

  @ViewChild('containerMonths') containerMonths!:ElementRef;
  nextMonth(){
    this.containerMonths.nativeElement.scrollBy({
      left: 150,
      behavior: 'smooth'
    })
  }


  prevMonth(){
    this.containerMonths.nativeElement.scrollBy({

      left: -150,
      behavior: 'smooth'
    })
  }
  
  onSubmit() {
    console.log("form data: ", this.form.value);

    // Call API
    // this._terminationContractService.submitTermination(this.form.value)
      // .pipe(takeUntilDestroyed(this.destroyRef))
      // .subscribe(res => {
        // console.log(res);
      // });
  }



  accountDataFetch(){
    this.accountServices.getAllData({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.accountData=res.rows;
      console.log("accounting",this.accountData);
    })

  }


  datamsg:any

  getMessageTemplateDetails(){
     this.messageTemplateServices.getAllDataMessageForms(0,0).subscribe((res:any)=>{
    // console.log(res);
    this.datamsg=res.items;
    console.log('datamsg',this.datamsg)
  })
  }
  

  changeMsg(e:any){
    console.log(e);

     
  this.form.get('messageText')?.patchValue(e.body);


  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this._editBehaviorService.clearId){
      this._editBehaviorService.clearId();
    }
  }


  financiallyAccountId:any
  accountId:any

 
 EndedContract(){
  let formEndedContract = {
    contractId: this.form.get('contractNumber')?.value,
    fromMonth: this.endMonthIndex,
    year: this.endYear,
    messageId: this.form.get('messageId')?.value,
    messageText: this.form.get('messageText')?.value,
    useWhatsApp: this.form.get('useWhatsApp')?.value,
    useEmail: this.form.get('useEmail')?.value,
    useSms: this.form.get('useSms')?.value,
    refundedMonths: this.form.get('refundedMonths')?.value,
    refundTax: this.form.get('refundTax')?.value,
    refundInsuranceValue: this.form.get('refundInsuranceValue')?.value,
    refundNet: this.form.get('refundNet')?.value,
    tenantId: this.form.get('tenantId')?.value,
    financialTenantId: this.form.get('financiallyAccountId')?.value,
    accountId: this.accountId,
    financiallyAccountId: this.financiallyAccountId
  };
  this._terminationContractService.createRefund(formEndedContract).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res)=>{
    this.toastr.show('تم انهاء العقد بنجاح','success');
    this.router.navigate(['/dashboard/querycontract']);
  });
}







  financiallyData(selectedAccount: any) {
    // تأكد أنه ليس undefined
    console.log('selectedAccount', selectedAccount);

    if (!selectedAccount) return;


    this.accountId = selectedAccount.id;
    this.financiallyAccountId = selectedAccount.financiallyAccountId;
}

}
