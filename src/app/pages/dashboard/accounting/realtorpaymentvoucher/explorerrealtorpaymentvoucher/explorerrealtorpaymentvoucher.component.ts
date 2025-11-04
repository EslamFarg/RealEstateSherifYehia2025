import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RealtorpaymentvoucherService } from '../services/realtorpaymentvoucher.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorerrealtorpaymentvoucher',
  templateUrl: './explorerrealtorpaymentvoucher.component.html',
  styleUrl: './explorerrealtorpaymentvoucher.component.scss'
})
export class ExplorerrealtorpaymentvoucherComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services;
_realtorpaymentvoucherService:RealtorpaymentvoucherService=inject(RealtorpaymentvoucherService)
destroyRef:DestroyRef=inject(DestroyRef)
toastr:ToastrService=inject(ToastrService)
router:Router=inject(Router)
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties;

  
  EditBehaviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService)
  dataFilter=['رقم السند','اسم السمسار','رقم العقد']
  // _

  
   vouchersData:any = [];
  showDelete=false;
  deleteId:any
// pagination

pageIndex=1
pageSize=10


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllDataVouchers();
 }

onPageChanged(page: number) {
  this.pageIndex = page;
  this.getAllDataVouchers();
}



getAllDataVouchers(){
  let pagination={
  paginationInfo: {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  }
}
  this._realtorpaymentvoucherService.getAllDataBroker(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    console.log(res);
    this.vouchersData=res
  });
}

// onSelectedFilter(page:any){
//   // console.log(this.selectedDataFilter)
//   console.log(page)
//   this.pageSize=page;
//   this.getAllDataVouchers();

// }

onSelectedPagination(val:any){
  this.pageSize=val
  this.getAllDataVouchers();
}

onSelectedFilter(e:any){

  if (e.value === '' || e.value == null || e.value==undefined) {
    this.getAllDataVouchers();
    return;
  }

  let shapeSearch: any = {
    criteriaDto: {
      paginationInfo: {
        pageIndex: 0,
        pageSize: 0
      }
    },
 
  };

  if (e.index == 0) {
   
    shapeSearch.brockerPaymentId = e.value;
  } 
  else if (e.index == 1) {
    shapeSearch.brockerName = e.value;
  } 
  else if (e.index == 2) {
    shapeSearch.contractId = e.value;
  }

  console.log("Request Body:", shapeSearch);

  this._realtorpaymentvoucherService
    .filterSearch(shapeSearch)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res: any) => {
    //    if (res.rows && res.rows.length === 0) {
    //   this.vouchersData = [];
    //   return;
    // }

    // // ✅ لو الرد بدون rows (مثل array مباشرة)
    // if (Array.isArray(res) && res.length === 0) {
    //   this.vouchersData = [];
    //   return;
    // }

      this.vouchersData = res;
    });

}

deleteData(id:any){
  this.deleteId=id
  this.showDelete=true

}
deleteConfirmed(id:any){
  this.showDelete=false;
  this._realtorpaymentvoucherService.deleteDataBrokerPaymentVoucher(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف السند بنجاح','success');
    this.getAllDataVouchers();
  })
  
}

getDataUpdate(id:any){

  this.EditBehaviorServices.setId(id);
  this.router.navigate(['/dashboard/realtorpaymentvoucher/addrealtorpaymentvoucher']);

}

onClose(){
  this.showDelete=false
}
}
