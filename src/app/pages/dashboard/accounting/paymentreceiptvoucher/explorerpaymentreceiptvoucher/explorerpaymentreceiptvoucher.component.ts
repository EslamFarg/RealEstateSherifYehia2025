import { Component, DestroyRef, inject } from '@angular/core';
import { paymentreceiptvoucherService } from '../services/paymentrecipt.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorerpaymentreceiptvoucher',
  templateUrl: './explorerpaymentreceiptvoucher.component.html',
  styleUrl: './explorerpaymentreceiptvoucher.component.scss'
})
export class ExplorerpaymentreceiptvoucherComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 services
_paymentReceiptVoucherService:paymentreceiptvoucherService=inject(paymentreceiptvoucherService);
destroyRef:DestroyRef=inject(DestroyRef);
toastr:ToastrService=inject(ToastrService);
editBehviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService)
router:Router=inject(Router)


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property

dataFilter=["رقم السند ",'اسم المستاجر']


 receiptsData:any= []

// pagination

pageIndex=1
pageSize=10
showDelete=false
deleteId:any


// !!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllData();
}

onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
  this.getAllData();
}


getAllData(){
  let pagination={
      paginationInfo: {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  }
  }

  this._paymentReceiptVoucherService.getAllData(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.receiptsData=res
    console.log(this.receiptsData);
  })
}


onSearchFilter(e:any){

  let ShapeDataFilter:any={
 
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  }
}

//  "tenantReceiptVoucherId": 0,
//   "contractInstallmentId": 0,
//   "tenantName": "string",
console.log(e.value);

if(e.index == 0){
  ShapeDataFilter.tenantReceiptVoucherId=e.value
}else if(e.index == 1){
  ShapeDataFilter.tenantName=e.value
}else if(e.index == 2){
  ShapeDataFilter.contractInstallmentId=e.value
}
this._paymentReceiptVoucherService.searchFilter(ShapeDataFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  this.receiptsData=res;
  console.log(this.receiptsData);
})
}

onSelectedPagination(val:any){
this.pageSize=val
this.getAllData();

}


onClose(){
  this.showDelete=false;
}


ShowdeletePopup(id:any){
  this.showDelete=true;
  this.deleteId=id;
}

deleteConfirmed(id:any){
  this.showDelete=false
  this._paymentReceiptVoucherService.deleteData(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف السند بنجاح','success');
    this.getAllData();
  })
}


ShoweditPopup(id:any){
this.editBehviorServices.setId(id);
this.router.navigate(['/dashboard/paymentreceiptvoucher/addpaymentreceiptvoucher']);
}



}
