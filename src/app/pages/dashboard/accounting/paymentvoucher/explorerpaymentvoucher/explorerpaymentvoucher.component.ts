import { Component, DestroyRef, inject } from '@angular/core';
import { OwnerpaymentvoucherService } from '../services/ownerpaymentvoucher.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorerpaymentvoucher',
  templateUrl: './explorerpaymentvoucher.component.html',
  styleUrl: './explorerpaymentvoucher.component.scss'
})
export class ExplorerpaymentvoucherComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services
  _ownerPaymentVoucherSer:OwnerpaymentvoucherService=inject(OwnerpaymentvoucherService)
  destroyRef:DestroyRef=inject(DestroyRef)
  toastr:ToastrService=inject(ToastrService)
  editBehaviorSubject:EditBehaviorServiceService=inject(EditBehaviorServiceService)
  router:Router=inject(Router)

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property

  dataFilter=['رقم السند','اسم المالك','رقم المالك']

   vouchersData:any = [];


// pagination

pageIndex=1
pageSize=10
showDelete=false;
deleteId:any


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Methods

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllDataPaymentVoucher();
}

onPageChanged(page: number) {
  this.pageIndex = page;
  this.getAllDataPaymentVoucher();
}


getAllDataPaymentVoucher(){
  let pagination={
      "paginationInfo": {
    "pageIndex": this.pageIndex,
    "pageSize": this.pageSize
  }
  }
  this._ownerPaymentVoucherSer.getAllDataOwnerPaymentVoucher(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>
    {
      
      this.vouchersData=res;
      console.log(this.vouchersData);


    })

}


onSelectedPagination(val:any){
  this.pageSize=val
  this.getAllDataPaymentVoucher();
}
onSearchFilter(e:any){
// console.log(e);
 if (e.value === '' || e.value == null || e.value==undefined) {
    this.getAllDataPaymentVoucher();
    return;
  }
let shapeSearch:any={
 
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  }
}


if(e.index == 0){
  shapeSearch.ownerPaymentVoucherId=e.value

}else if(e.index==1){
  shapeSearch.ownerName=e.value

}else if(e.index==2){
  shapeSearch.ownerId=e.value
}


this._ownerPaymentVoucherSer.filterDatailsOwner(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>
{

  // console.log(res);

  // if(!res.rows && res.rows.length==0){
  //   this.vouchersData=[];
  //   return ;
  // }
  this.vouchersData=res;
  // console.log(this.vouchersData);
})




}

ShowdeletePopup(id:any){

  if(id){
    this.showDelete=true;
    this.deleteId=id
  }

}

onClose(){
  this.showDelete=false;
}

deleteConfirmed(id:any){
  this.showDelete=false;
  this._ownerPaymentVoucherSer.deleteData(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف السند بنجاح','success');
    this.getAllDataPaymentVoucher();
  })
}


goToEditPopup(id:any){
 this.editBehaviorSubject.setId(id);
 this.router.navigate(['/dashboard/paymentvoucher/addpaymentvoucher'])
}
}
