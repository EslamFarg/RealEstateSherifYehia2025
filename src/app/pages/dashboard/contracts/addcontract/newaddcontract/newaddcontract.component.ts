import { Component, DestroyRef, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesettingsService } from '../../../messages/messagesettings/services/messagesettings.service';
import { MessageformsService } from '../../../messages/messageforms/services/messageforms.service';
import { AddcontractService } from '../services/addcontract.service';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';

@Component({
  selector: 'app-newaddcontract',
  templateUrl: './newaddcontract.component.html',
  styleUrl: './newaddcontract.component.scss'
})
export class NewaddcontractComponent {


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Serivces


  fb:FormBuilder=inject(FormBuilder);
  messageTemplateServices: MessageformsService=inject(MessageformsService);
  addContractServices:AddcontractService=inject(AddcontractService)
  destroyRef:DestroyRef=inject(DestroyRef);
  toastr:ToastrService=inject(ToastrService)
  editBehaviorService:EditBehaviorServiceService=inject(EditBehaviorServiceService)
  showPopupSearchUnit:boolean=false;
  showPopupSearchTenant:boolean=false;
  dataArraySearch:any[]=[]
  dataArraySearchTenant:any[]=[]



  showPopupSearchBroker:boolean=false;
  dataArraySearchBroker:any[]=[]

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property
paymentMethods:any[]=[
  {
    id:1,
    name:'كاش'

  },
  {
    id:2,
    name:'فيزا'

  }
];
contractsForm=this.fb.group({
  ContractPlace:['',[Validators.required,Validators.minLength(3)]],
  ContractDate:[this.formatDate(),[Validators.required]],
  LeaseStartDate:[this.formatDateMinusYear(),Validators.required],
  LeaseEndDate:[this.formatDateaddYear(),Validators.required],
  //  MonthsCount: [{ value: '', disabled: true }]
  LeaseMonths:['',Validators.required],
  BookNumber:['',Validators.required],
  PaymentMethod:[null,Validators.required],
  Description:[''],
  Files:[''],
  // Property
  PropertyId:['',[Validators.required]],
  UnitId:[''],
  TenantId:['',Validators.required],
  BrokerId:['',Validators.required],

  ContractValue:['',Validators.required],
TaxAmount:['',Validators.required],
TotalAmount:['',Validators.required],
BrokerCommission:[''] ,
OtherCommission:['0'],
InsuranceValue:['0'],
NetAmount:['',Validators.required],

  MessageId:[null,Validators.required],
  SendBeforeAfter:[5,Validators.required],
  MessageText:['',Validators.required],
  UseSms:[true],
  UseEmail:[false],
  UseWhatsApp:[false],

 
 
},
 {
  validators: [this.atLeastOneMethod()]   // ✅ أضف هنا
}

)


  // formDataUnit=this.fb.group({
  //   PropertyId:[''],
  //   propertyName:[''],
  //   name:[''],
  //   floorNumber:[''],
  //   street:[''],
  //   district:[''],
  //   city:[''],
  // })

atLeastOneMethod() {
  return (form: FormGroup) => {

    const sms = form.get('UseSms')?.value;
    const wa = form.get('UseWhatsApp')?.value;
    const email = form.get('UseEmail')?.value;

    if (!sms && !wa && !email) {
      return { methodRequired: true };   // ✅ الخطأ
    }

    return null;
  };
}





  msgTextarea='';
  dataFiles:any[]=[]
  idRemoveFiles:any[]=[]
  showDelete=false;
  deleteId:any
  
// !!!!!!!!!!!!!!!!!!!!!!!!!!1 Methods

recalculateFromTotal() {
  const total = Number(this.contractsForm.get('TotalAmount')?.value) || 0;

  this.addContractServices.getTaxes().subscribe((taxValue: any) => {
    const taxRate = taxValue / 100;
    const contractValue = total / (1 + taxRate);
    const taxAmount = total - contractValue;

    this.contractsForm.patchValue({
      ContractValue: contractValue,
      TaxAmount: taxAmount
    }, { emitEvent: false });

    this.getNet();
  });
}


formatDateMinusYear(yearsToSubtract: number = 1) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - yearsToSubtract); // نقص سنة
  return date.toISOString().split('T')[0]; // صيغة YYYY-MM-DD
}

formatDateaddYear(yearsToSubtract: number = 1) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + yearsToSubtract); // نقص سنة
  return date.toISOString().split('T')[0]; // صيغة YYYY-MM-DD
}

formatDate(){
   const date = new Date();
  return date.toISOString().split("T")[0];
  }

ngOnInit(): void {

  // getDataUpdate

  // this.contractsForm.get('TotalAmount')?.valueChanges
  // .pipe(takeUntilDestroyed(this.destroyRef))
  // .subscribe(total => {
  //   if (total) {
  //     this.recalculateFromTotal();
  //   }
  // });




  // console.log(date);

  const startDate = new Date(this.contractsForm.get('LeaseStartDate')?.value);
  const endDate = new Date(this.contractsForm.get('LeaseEndDate')?.value);

  // حساب عدد الأشهر
  const monthsCount = this.getMonthsDiff(startDate, endDate);
  this.contractsForm.patchValue({ LeaseMonths: monthsCount }, { emitEvent: false });

  // توليد قائمة الأشهر لواجهة المستخدم
  this.monthsList = this.getMonthsList(startDate, endDate);

  // الاستماع للتغيرات لاحقًا
  this.contractsForm.valueChanges.subscribe(res => {
    if(res.LeaseStartDate && res.LeaseEndDate){
      let start = new Date(res.LeaseStartDate);
      let end = new Date(res.LeaseEndDate);
      let monthsCount1 = this.getMonthsDiff(start, end);
      this.contractsForm.patchValue({ LeaseMonths: monthsCount1 }, { emitEvent: false });
      this.monthsList = this.getMonthsList(start, end);
    }
  });


  this.contractsForm.get('ContractValue')?.valueChanges
  .pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe(value => {
    if (value) {
      this.getTaxes();
    }
  });


  this.editBehaviorService.idSubscribe.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((id:any)=>{
    if(id){
        this.btnAddandUpdate = 'update';       // ✅ تحويل المود إلى تحديث
        this.idUpdate = id;
        // this.
      this.addContractServices.getDataById(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
       this.contractNumber.nativeElement.value=res.id;
        
this.contractsForm.patchValue({

  ContractPlace: res.contractPlace,
  ContractDate: res.contractDate,
  LeaseStartDate: res.leaseStartDate,
  LeaseEndDate: res.leaseEndDate,
  LeaseMonths: res.leaseMonths,
  BookNumber: res.bookNumber,
  PaymentMethod: res.paymentMethod,
  Description: res.description,

  
  ContractValue: res.financial?.contractValue,
  TaxAmount: res.financial?.taxAmount,
  TotalAmount: res.financial?.totalAmount,
  BrokerCommission: res.financial?.brokerCommission,
  OtherCommission: res.financial?.otherCommission,
  InsuranceValue: res.financial?.insuranceValue,
  NetAmount: res.financial?.netAmount,

 
  PropertyId: res.unit?.propertyID,
  UnitId: res.unit?.id ?? null,
  TenantId: res.tenant?.id,
  BrokerId: res.broker?.id,

  MessageId: res.messageId,
  MessageText: res.messageText,
  SendBeforeAfter: res.sendBeforeAfter,
  UseSms: res.useSms,
  UseEmail: res.useEmail,
  UseWhatsApp: res.useWhatsApp,

});


this.formDataUnit.patchValue({
  PropertyId: res.unit?.name,
  propertyName: res.unit?.name,
  name: res.unit?.name ?? null,
  floorNumber: res.unit?.floorNumber ?? null,
  street: res.unit?.street,
  district: res.unit?.district,
  city: res.unit?.city,
});

// ✅ Patch للمستأجر
this.formDataTenant.patchValue({
  TenantId: res.tenant?.name,
  name: res.tenant?.name,
  nationality: res.tenant?.nationality,
  mobile: res.tenant?.mobile,
  email: res.tenant?.email,
  nationalID: res.tenant?.nationalID,
});

// ✅ Patch للسمسار
this.formDataBroker.patchValue({
  BrokerId: res.broker?.name,
  name: res.broker?.name,
  mobile: res.broker?.mobile,
  nationalID: res.broker?.nationalID
});

// ✅ الملفات
this.dataFiles = res.attachments || [];
this.contractsForm.get("Files")?.setValue([]);

// ✅ لعرض أزرار التحديث والحذف
this.showBtns = true;

    })
  }
  })


  this.getAllMessage();
  this.contractsForm.valueChanges.subscribe((res:any)=>{
    if(res.LeaseStartDate && res.LeaseEndDate){
      let startDate=new Date(res.LeaseStartDate);
      let endDate=new Date(res.LeaseEndDate);
      let monthsCount1:any=this.getMonthsDiff(startDate,endDate);
      this.contractsForm?.patchValue(
          { LeaseMonths: monthsCount1 },
          { emitEvent: false }
      );
      this.monthsList = this.getMonthsList(startDate, endDate);
 
    }
         this.getNet();
  })
  

  
}



// Searchby Id Number

searchByIdInput(e:any){

  const val=e.value;

  if(val == '' || val == null || val == undefined){
    this.toastr.show('الرجاء ادخال البحث','error');
    return;
  }


  
  this.addContractServices.getDataById(val).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
         this.contractNumber.nativeElement.value=res.id;
          this.idUpdate=res.id;
          this.btnAddandUpdate='update';
this.contractsForm.patchValue({

  ContractPlace: res.contractPlace,
  ContractDate: res.contractDate,
  LeaseStartDate: res.leaseStartDate,
  LeaseEndDate: res.leaseEndDate,
  LeaseMonths: res.leaseMonths,
  BookNumber: res.bookNumber,
  PaymentMethod: res.paymentMethod,
  Description: res.description,

  
  ContractValue: res.financial?.contractValue,
  TaxAmount: res.financial?.taxAmount,
  TotalAmount: res.financial?.totalAmount,
  BrokerCommission: res.financial?.brokerCommission,
  OtherCommission: res.financial?.otherCommission,
  InsuranceValue: res.financial?.insuranceValue,
  NetAmount: res.financial?.netAmount,

 
  PropertyId: res.unit?.propertyID,
  UnitId: res.unit?.id ?? null,
  TenantId: res.tenant?.id,
  BrokerId: res.broker?.id,

  MessageId: res.messageId,
  MessageText: res.messageText,
  SendBeforeAfter: res.sendBeforeAfter,
  UseSms: res.useSms,
  UseEmail: res.useEmail,
  UseWhatsApp: res.useWhatsApp,

});


this.formDataUnit.patchValue({
  PropertyId: res.unit?.name,
  propertyName: res.unit?.name,
  name: res.unit?.name ?? null,
  floorNumber: res.unit?.floorNumber ?? null,
  street: res.unit?.street,
  district: res.unit?.district,
  city: res.unit?.city,
});

// ✅ Patch للمستأجر
this.formDataTenant.patchValue({
  TenantId: res.tenant?.name,
  name: res.tenant?.name,
  nationality: res.tenant?.nationality,
  mobile: res.tenant?.mobile,
  email: res.tenant?.email,
  nationalID: res.tenant?.nationalID,
});

// ✅ Patch للسمسار
this.formDataBroker.patchValue({
  BrokerId: res.broker?.name,
  name: res.broker?.name,
  mobile: res.broker?.mobile,
  nationalID: res.broker?.nationalID
});

// ✅ الملفات
this.dataFiles = res.attachments || [];
this.contractsForm.get("Files")?.setValue([]);

// ✅ لعرض أزرار التحديث والحذف
this.showBtns = true;



  })


}

// SEarch By Unit

dataFilterUnit=['رقم الوحده','اسم الوحده','اسم العقار']
  selectIndexUnit:any=0
  getAllDataUnitProperty:any[]=[];

  formDataUnit:any=this.fb.group({
    PropertyId:['',Validators.required],
    propertyName:[''],
    name:[''],
    floorNumber:[''],
    street:[''],
    district:[''],
    city:[''],
  })

selectDataFilterUnit(i:any){
  this.selectIndexUnit=i
}


showPopupFilterUnitProperty=false
showPopupFilterUnit(){

  this.showPopupFilterUnitProperty=!this.showPopupFilterUnitProperty

}

searchFilterUnit(val:any){ 

  
  if(val.value == '' || val.value == null || val.value == undefined){
    this.toastr.show('الرجاء ادخال البحث','error');
    return ; 
  }

  let shapeSearch={
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  },
  "searchFilter": {
    "column": 0,
    "value": val.value
  }
}


  if(this.selectIndexUnit == 0){
    shapeSearch.searchFilter.column=0
  }else if(this.selectIndexUnit == 1){
    shapeSearch.searchFilter.column=1
  }else if(this.selectIndexUnit == 2){
    shapeSearch.searchFilter.column=2
  }


 this.addContractServices.searchByUnit(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{

  if(res.rows.length == 0 || res.rows == null || !res.rows ){
      this.toastr.show('لا يوجد بيانات','error');
      this.formDataBroker.reset();
      return;
    }


    this.showPopupSearchUnit=true
    this.dataArraySearch=res.rows;

    console.log(this.dataArraySearch);
   
 })
}

@HostListener('document:click', ['$event'])

onDocumentClick(event: MouseEvent) {
 const target = event.target as HTMLElement;

  // ✅ لو الضغط داخل البوپ أب → لا تقفله
  if (target.closest('.icon_search_unit')) return;

  // ✅ لو الضغط خارج البوپ أب → اقفله
  if (this.showPopupFilterUnitProperty) {
    this.showPopupFilterUnitProperty = false;
  }
}


//! Search By Tenant

dataFilterTenant=['اسم المستأجر','رقم الهويه','رقم الجوال']
  selectIndexTenant:any=0
  getAllDataTenant:any[]=[];


  


  formDataTenant:any=this.fb.group({
    TenantId: ['',Validators.required],
    name: [''],
    nationality: [''],
    mobile: [''],
    email: [''],
    nationalID: [''],
    attachments: [0]
  })

selectDataFilterTenant(i:any){
  this.selectIndexTenant=i
}


showPopupFilterTanentProperty=false
showPopupFilterTenant(){

  this.showPopupFilterTanentProperty=!this.showPopupFilterTanentProperty

}

searchFilterTenant(val:any){
  
  if(val.value == '' || val.value == null || val.value == undefined){
    this.toastr.show('الرجاء ادخال البحث','error');
    return ; 
  }
  let shapeSearch={
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  },
  "searchFilter": {
    "column": 0,
    "value": val.value
  }
}


  if(this.selectIndexTenant == 0){
    shapeSearch.searchFilter.column=1
  }else if(this.selectIndexTenant == 1){
    shapeSearch.searchFilter.column=2
  }else if(this.selectIndexTenant == 2){
    shapeSearch.searchFilter.column=3
  }


  this.addContractServices.searchByTenant(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    if(res.rows.length == 0 || res.rows == null || !res.rows ){
      this.toastr.show('لا يوجد بيانات','error');
      this.formDataBroker.reset();
      return;
    }


    this.showPopupSearchTenant=true
    this.dataArraySearchTenant=res.rows;

    console.log(this.dataArraySearchTenant)


  


  })

}

@HostListener('document:click', ['$event'])

onDocumentClickTenant(event: MouseEvent) {
 const target = event.target as HTMLElement;

  // ✅ لو الضغط داخل البوپ أب → لا تقفله
  if (target.closest('.icon_search_Tenant')) return;

  // ✅ لو الضغط خارج البوپ أب → اقفله
  if (this.showPopupFilterTanentProperty) {
    this.showPopupFilterTanentProperty = false;
  }
}

// !!!!!!! SearchByBroker



dataFilterBroker=['اسم المستأجر','رقم الهويه','رقم الجوال']
  selectIndexBroker:any=0
  getAllDataBroker:any[]=[];


  


  formDataBroker:any=this.fb.group({
    BrokerId: ['',Validators.required],
    name: [''],
   
    mobile: [''],
   
    nationalID: [''],
   
  })

selectDataFilterBroker(i:any){
  this.selectIndexBroker=i
}


showPopupFilterBrokerProperty=false
showPopupFilterBroker(){

  this.showPopupFilterBrokerProperty=!this.showPopupFilterBrokerProperty

}

searchFilterBroker(val:any){

  if(val.value == '' || val.value == null || val.value == undefined){
    this.toastr.show('الرجاء ادخال البحث','error');
    return ; 
  }
  let shapeSearch={
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  },
  "searchFilter": {
    "column": 0,
    "value": val.value
  }
}


  if(this.selectIndexBroker == 0){
    shapeSearch.searchFilter.column=1
  }else if(this.selectIndexBroker == 1){
    shapeSearch.searchFilter.column=2
  }else if(this.selectIndexBroker == 2){
    shapeSearch.searchFilter.column=3
  }


  this.addContractServices.searchByBroker(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{

    if(res.rows.length == 0 || res.rows == null || !res.rows ){


      this.toastr.show('لا يوجد بيانات','error');
      this.formDataBroker.reset();
      return;
    }

    this.showPopupSearchBroker=true
    this.dataArraySearchBroker=res.rows;

    
  })


  // })

}

@HostListener('document:click', ['$event'])

onDocumentClickBroker(event: MouseEvent) {
 const target = event.target as HTMLElement;

  // ✅ لو الضغط داخل البوپ أب → لا تقفله
  if (target.closest('.icon_search_Broker')) return;

  // ✅ لو الضغط خارج البوپ أب → اقفله
  if (this.showPopupFilterBrokerProperty) {
    this.showPopupFilterBrokerProperty = false;
  }
}




//!!!!!!!!!!!!!!!!!!!!!!!!!!!1 GEt Taxes


 getTaxes() {
  const value = Number(this.contractsForm.get('ContractValue')?.value);

  if (!value) return;   

  this.addContractServices.getTaxes()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res:any)=>{
        let taxes = value * (res / 100);
        this.contractsForm.patchValue({ TaxAmount: taxes });
        this.getTotal();  
    });
}



getTotal(){
 let total =
  Number(this.contractsForm.get('ContractValue')?.value) +
  Number(this.contractsForm.get('TaxAmount')?.value);

this.contractsForm.patchValue({ TotalAmount: total });
this.getNet();
}


getNet() {
  const total = Number(this.contractsForm.get('TotalAmount')?.value) || 0;
  const broker = Number(this.contractsForm.get('BrokerCommission')?.value) || 0;
  const other = Number(this.contractsForm.get('OtherCommission')?.value) || 0;
  const insurance = Number(this.contractsForm.get('InsuranceValue')?.value) || 0;

  const net = total + (broker + other + insurance);

  this.contractsForm.patchValue({ NetAmount: net }, { emitEvent: false });
}



getMonthsDiff(date1:any,date2:any) {
  let years = date2.getFullYear() - date1.getFullYear();
  let months = date2.getMonth() - date1.getMonth();
  return years * 12 + months;
}

getMonthsList(startDate: Date, endDate: Date) {
  const result: any[] = [];
  const monthsNames = [
    'يناير','فبراير','مارس','أبريل','مايو','يونيو',
    'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'
  ];

  let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  while (current <= endDate) {
    result.push({
      month: monthsNames[current.getMonth()],
      year: current.getFullYear()
    });
    current.setMonth(current.getMonth() + 1);
  }

  return result;
}


monthsList: any[] = [];


@ViewChild('MonthContainer') MonthContainer!:ElementRef

prevMonths(){

  this.MonthContainer.nativeElement.scrollBy({
    left:-100,
    behavior:'smooth'
  })



}


nextMonths(){

  this.MonthContainer.nativeElement.scrollBy({
    left:100,
    behavior:'smooth'
  })
}
  changeMsg(e:any){
    console.log(e);

    // setTimeout(() => {
  //  this.msgTextarea=e.body;    
  this.contractsForm.get('MessageText')?.patchValue(e.body);
  

  }

   datamsg=[]

 OnDataFiles(ValueDataFiles:any){
  this.contractsForm.get('Files')?.patchValue(ValueDataFiles);
 
}

fnIdRemoveFiles(id:any){

  this.dataFiles=this.dataFiles.filter((el:any)=>el.id != id);
  this.idRemoveFiles.push(id);
  

}


btnAddandUpdate='add';
idUpdate:any

@ViewChild('contractNumber') contractNumber!:ElementRef

showBtns=false;
onSubmit(){

   

  if(this.contractsForm.valid){

  let formData = new FormData();

formData.append('ContractPlace', this.contractsForm.value.ContractPlace);
formData.append('ContractDate', this.contractsForm.value.ContractDate);
formData.append('LeaseStartDate', this.contractsForm.value.LeaseStartDate);
formData.append('LeaseEndDate', this.contractsForm.value.LeaseEndDate);
formData.append('LeaseMonths', String(this.contractsForm.value.LeaseMonths));
formData.append('BookNumber', this.contractsForm.value.BookNumber);
formData.append('PaymentMethod', this.contractsForm.value.PaymentMethod);
formData.append('Description', this.contractsForm.value.Description ?? '');
formData.append('ContractValue', String(this.contractsForm.value.ContractValue));
formData.append('PropertyId', String(this.contractsForm.value.PropertyId));
formData.append('UnitId', String(this.contractsForm.value.UnitId));
formData.append('TenantId', String(this.contractsForm.value.TenantId));
formData.append('BrokerId', String(this.contractsForm.value.BrokerId));
formData.append('OtherCommission', String(this.contractsForm.value.OtherCommission));
formData.append('MessageId', String(this.contractsForm.value.MessageId));
formData.append('BrokerCommission', String(this.contractsForm.value.BrokerCommission));
formData.append('SendBeforeAfter', String(this.contractsForm.value.SendBeforeAfter));
formData.append('MessageText', this.contractsForm.value.MessageText);
formData.append('UseWhatsApp', String(this.contractsForm.value.UseWhatsApp));
formData.append('UseEmail', String(this.contractsForm.value.UseEmail));
formData.append('UseSms', String(this.contractsForm.value.UseSms));
formData.append('InsuranceValue', String(this.contractsForm.value.InsuranceValue));
formData.append('TaxAmount', String(this.contractsForm.value.TaxAmount));
formData.append('TotalAmount', String(this.contractsForm.value.TotalAmount));
formData.append('NetAmount', String(this.contractsForm.value.NetAmount));
// formData.append('Files', this.contractsForm.value.Files);
    // console.log(data);

    if (this.contractsForm.value.Files && this.contractsForm.value.Files.length) {
  this.contractsForm.value.Files.forEach((file: any) => {
    formData.append('Files', file);
  });
}

 
    if(this.btnAddandUpdate == 'add'){


      this.addContractServices.createContract(formData).pipe((takeUntilDestroyed(this.destroyRef))).subscribe((res:any)=>{
        this.toastr.show('تم حفظ البيانات بنجاح','success');
        this.idUpdate=res
        this.btnAddandUpdate='update';
        this.contractNumber.nativeElement.value=res
        this.showBtns=true
        // console.log(res);
      })
      


    }else{
      // Update

        let formDataUpdate:any = new FormData();

formDataUpdate.append('Id', this.idUpdate);
formDataUpdate.append('ContractPlace', this.contractsForm.value.ContractPlace);
formDataUpdate.append('ContractDate', this.contractsForm.value.ContractDate);
formDataUpdate.append('LeaseStartDate', this.contractsForm.value.LeaseStartDate);
formDataUpdate.append('LeaseEndDate', this.contractsForm.value.LeaseEndDate);
formDataUpdate.append('LeaseMonths', String(this.contractsForm.value.LeaseMonths));
formDataUpdate.append('BookNumber', this.contractsForm.value.BookNumber);
formDataUpdate.append('PaymentMethod', this.contractsForm.value.PaymentMethod);
formDataUpdate.append('Description', this.contractsForm.value.Description ?? '');
formDataUpdate.append('ContractValue', String(this.contractsForm.value.ContractValue));
formDataUpdate.append('PropertyId', String(this.contractsForm.value.PropertyId));
formDataUpdate.append('UnitId', String(this.contractsForm.value.UnitId));
formDataUpdate.append('TenantId', String(this.contractsForm.value.TenantId));
formDataUpdate.append('BrokerId', String(this.contractsForm.value.BrokerId));
formDataUpdate.append('OtherCommission', String(this.contractsForm.value.OtherCommission));
formDataUpdate.append('MessageId', String(this.contractsForm.value.MessageId));
formDataUpdate.append('BrokerCommission', String(this.contractsForm.value.BrokerCommission));
formDataUpdate.append('SendBeforeAfter', String(this.contractsForm.value.SendBeforeAfter));
formDataUpdate.append('MessageText', this.contractsForm.value.MessageText);
formDataUpdate.append('UseWhatsApp', String(this.contractsForm.value.UseWhatsApp));
formDataUpdate.append('UseEmail', String(this.contractsForm.value.UseEmail));
formDataUpdate.append('UseSms', String(this.contractsForm.value.UseSms));
formDataUpdate.append('InsuranceValue', String(this.contractsForm.value.InsuranceValue));
formDataUpdate.append('TaxAmount', String(this.contractsForm.value.TaxAmount));
formDataUpdate.append('TotalAmount', String(this.contractsForm.value.TotalAmount));
formDataUpdate.append('NetAmount', String(this.contractsForm.value.NetAmount));


this.idRemoveFiles.forEach((id: any) => formDataUpdate.append('RemovedAttachmentIds', id));
// نرسل فقط الملفات الحقيقية
const files: any[] = this.contractsForm.value.Files || [];
files
  .filter(file => file instanceof File)
  .forEach(file => formData.append('NewFiles', file));

   this.addContractServices.updateContract(formDataUpdate).pipe((takeUntilDestroyed(this.destroyRef))).subscribe((res:any)=>{
      this.toastr.show('تم تحديث البيانات بنجاح','success');
      // console.log(res);
      this.showBtns=true
      this.btnAddandUpdate='update'
    })
    }


   


    

  }else{
    this.contractsForm.markAllAsTouched();
    this.formDataUnit.markAllAsTouched();
    this.formDataTenant.markAllAsTouched();
    this.formDataBroker.markAllAsTouched();
  }

}



getAllMessage(){
  let pagination={
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  }
  this.messageTemplateServices.getAllDataMessageForms(0,0).subscribe((res:any)=>{
    // console.log(res);
    this.datamsg=res.items;
    console.log('datamsg',this.datamsg)
  })
}



onClose(){
  this.showDelete=false;
}

deleteConfirmed(id:any){
  this.showDelete=false;
  this.addContractServices.deleteContract(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف العقار بنجاح','success');
    this.resetAllData();

  })
}

showPopupDelete(){
  this.showDelete=true
  this.deleteId=this.idUpdate
}



resetAllData() {
  // ✅ Reset نموذج العقد بالكامل
  this.contractsForm.reset({
    PaymentMethod: 'cash',
    SendBeforeAfter: 5,
    UseSms: true,
    UseEmail: false,
    UseWhatsApp: false
  });

  // ✅ Reset نموذج الوحدة
  this.formDataUnit.reset({
    PropertyId: '',
    propertyName: '',
    name: '',
    floorNumber: '',
    street: '',
    district: '',
    city: ''
  });

  // ✅ Reset نموذج المستأجر
  this.formDataTenant.reset({
    TenantId: '',
    name: '',
    nationality: '',
    mobile: '',
    email: '',
    nationalID: '',
    attachments: 0
  });

  // ✅ Reset نموذج السمسار
  this.formDataBroker.reset({
    BrokerId: '',
    name: '',
    nationalID: '',
    mobile: ''
  });


  this.dataFiles = [];
  this.idRemoveFiles = [];
  this.contractsForm.get('Files')?.setValue([]);

  this.monthsList = [];


  this.btnAddandUpdate = 'add';
  this.idUpdate = null;

 
  if (this.contractNumber) {
    this.contractNumber.nativeElement.value = '';
  }

  this.showBtns = false;

  this.msgTextarea = '';

 
  this.showPopupFilterUnitProperty = false;
  this.showPopupFilterTanentProperty = false;
  this.showPopupFilterBrokerProperty = false;

  // ✅ Clear touched state
  this.contractsForm.markAsUntouched();
  this.formDataUnit.markAsUntouched();
  this.formDataTenant.markAsUntouched();
  this.formDataBroker.markAsUntouched();
}


sendDataSelectedSearchUnit(e:any){

  this.showPopupSearchUnit=!this.showPopupSearchUnit

  
   this.getAllDataUnitProperty=e
   
   this.formDataUnit.patchValue(this.getAllDataUnitProperty)
   console.log(this.getAllDataUnitProperty);

   // ✅ ثق سعر الوحدة
let unitPrice = Number(e.price);

// ✅ خذ عدد الشهور الحالي
let months = Number(this.contractsForm.get('LeaseMonths')?.value) || 0;

// ✅ احسب القيمة الجديدة
let newContractValue = unitPrice * months;

   this.contractsForm.patchValue({
    PropertyId: e.propertyID,
    UnitId: e.id,
    ContractValue: newContractValue
   })
    this.getTaxes();
    this.getTotal();
   console.log(this.contractsForm.value);

}



sendDataSelectedSearchTenant(e:any){
    this.showPopupSearchTenant=!this.showPopupSearchTenant

    console.log(e);
    this.getTaxes();
    
    this.formDataTenant.patchValue(e)
    this.contractsForm.patchValue({
      TenantId: e.id
    })
}

sendDataSelectedSearchBroker(e:any){
  this.showPopupSearchBroker=!this.showPopupSearchBroker
     this.formDataBroker.patchValue({
      name:e.name,
      mobile:e.mobile,
      nationalID:e.nationalID
    })


    this.getTaxes();
    this.getTotal();
    this.contractsForm.patchValue({
      BrokerId:e.id,
      BrokerCommission:e.bonus

    })
}
ngOnDestroy(): void {

  if(this.editBehaviorService.clearId){
    this.editBehaviorService.clearId();
  }
}

}
