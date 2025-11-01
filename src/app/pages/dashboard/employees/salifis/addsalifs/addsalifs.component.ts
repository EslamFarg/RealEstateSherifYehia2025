import { Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../accounting/accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountSalfis } from '../models/salifs';
import { Employees } from '../../employees/models/employees';
import { EmployeesService } from '../../employees/services/employees.service';
import { SalifsService } from '../services/salifs.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';

@Component({
  selector: 'app-addsalifs',
  templateUrl: './addsalifs.component.html',
  styleUrl: './addsalifs.component.scss'
})
export class AddsalifsComponent {

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

fb:FormBuilder=inject(FormBuilder);
_accountService:AccountService=inject(AccountService);
_employeesService:EmployeesService=inject(EmployeesService);
_salifsService:SalifsService=inject(SalifsService);
destroyRef:DestroyRef=inject(DestroyRef);
toastr:ToastrService=inject(ToastrService);
_behaviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService);


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Property
showPopup=false;
salafisData=this.fb.group({
  // salifName: ['',[Validators.required]],
  bookNumber:['',[Validators.required,Validators.minLength(3)]],
 voucherDate:['',[Validators.required]],
 amount:['',[Validators.required]],
 notes:[''],
 accountId:[null,[Validators.required]],
 employeeId:[null,[Validators.required]],
 debitAccountId:[''],
 creditAccountId:['']
})


accountDataAll:AccountSalfis[]=[]
employeesDataAll:Employees[]=[]
btnAddandUpdate='add';
idUpdate:any
showDelete!:boolean
// idDelete
deleteId!:string
showBtns:boolean=false;
@ViewChild('NumberBond') NumberBond!:ElementRef
@ViewChild('searchVal') searchVal!:ElementRef
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Method
ngOnInit(){
  this.getAllDataAccount();
  this.getAllEmployees();

}


ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  
  this._behaviorServices.idSubscribe.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(id=>{
    if(id){
      // this.NumberBond.nativeElement.value=id;
      this.NumberBond.nativeElement.value=id

      this._salifsService.getDataById(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        console.log('RES',res);
        this.idUpdate=res.id
        this.salafisData.patchValue({
          bookNumber:res.bookNumber,
          voucherDate:res.advanceDate.split('T')[0],
          amount:res.amount,
          notes:res.description,
          accountId:res.accountID,
          employeeId:res.employeeID,
          debitAccountId:res.debitAccountId,
          creditAccountId:res.creditAccountId
        });

        this.btnAddandUpdate='update';
        this.showBtns=true
      })
    }
  })
}




onSubmit(){

  console.log(this.salafisData.value);
  if(this.salafisData.valid){
    
    let data={
  bookNumber: this.salafisData.value.bookNumber,
  voucherDate: this.salafisData.value.voucherDate,
  amount: this.salafisData.value.amount,
  notes: this.salafisData.value.notes,
  accountId: this.salafisData.value.accountId,
  employeeId: this.salafisData.value.employeeId,
  debitAccountId: this.salafisData.value.debitAccountId,
  creditAccountId: this.salafisData.value.creditAccountId
}
   if(this.btnAddandUpdate=='add'){
     this._salifsService.createPaymentVoucher(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      console.log(res);
      this.toastr.show('تم حفظ البيانات بنجاح','success');
      this.idUpdate=res
      this.showBtns=true;
      this.NumberBond.nativeElement.value=res
this.btnAddandUpdate='update'
      
      
    })
   }else{
    // Update

    let data={
      id:this.idUpdate,
      ...this.salafisData.value
    }
    this._salifsService.updatePaymentVoucher(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      console.log(res);
      this.toastr.show('تم تعديل البيانات بنجاح','success');
      this.btnAddandUpdate='add'
      this.salafisData.reset();
      
      
      this.NumberBond.nativeElement.value='0';
      this.searchVal.nativeElement.value='';

      this.showBtns=false
    })

   }

  }else{
    this.salafisData.markAllAsTouched();
  }
}



getAllDataAccount(){
this._accountService.getAllData({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  this.accountDataAll=res.rows
})
}


getAllEmployees(){
  this._employeesService.getAllDataEmployees({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.employeesDataAll=res.rows
  })
}

DataAccountfinancially(e:any){
  
  this.salafisData.get('creditAccountId')?.patchValue(e.financiallyAccountId);

 

}


// DataEmployeesfinancially(e:any){
//   // this.salafisData.get('debitAccountId')?.patchValue(e.financiallyAccountId);
  
  
// }

DataEmployeesfinancially(emp: any) {
 if (emp) {
    this.salafisData.get('employeeId')?.patchValue(emp.id);
    this.salafisData.get('debitAccountId')?.patchValue(emp.financiallyAccountId);
  }
}


resetForm(){
  this.salafisData.reset();
  this.btnAddandUpdate='add'
}

openDeletePopup(){
  this.showDelete=true
  this.deleteId=this.idUpdate
}

deleteConfirmed(id:any){

  this.showDelete=false;
  this._salifsService.deleteData(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف الصيانة بنجاح','success');
    this.resetForm();
    this.btnAddandUpdate='add';
    this.NumberBond.nativeElement.value='0';
    this.searchVal.nativeElement.value='';
    this.showBtns=false
  })

}


onClose(){
  this.showDelete=false
}


onSearch(searchVal:any){
  


  let ShapeDataFilter={

  searchRequest: {
    criteriaDto: {
      paginationInfo: {
        pageIndex: 0,
        pageSize: 0
      }
    },
    searchFilter: {
      column: 0,
      value: searchVal.value
    }
  }

}
  this._salifsService.searchData(ShapeDataFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    // this.salafisData.value.accountId=res.rows[0].accountId
    // console.log(res.rows[0])
    const row=res?.rows[0];
    console.log(row)


    if(res?.rows && res.rows.length > 0){
    // let date=row.advancedate?.split('T')[0]

    this.NumberBond.nativeElement.value=row.id
    // this.salafisData.get('accountId')?.patchValue(row.accountId);
    const date = row.advanceDate?.split('T')[0];
    this.salafisData.patchValue({
       bookNumber:row.bookNumber,
    voucherDate:date,
 amount:row.amount,
 notes:row.description,
 accountId:row.accountID,
 employeeId:row.employeeID,
 debitAccountId:row.debitAccountId,
 creditAccountId:row.creditAccountId

      
    })
    this.showBtns=true,
    this.btnAddandUpdate='update',
    this.idUpdate=row.id
  

    }else{
      this.toastr.show('لم يتم العثور على بيانات','error');
      this.resetForm();
    }

  })




}

}
