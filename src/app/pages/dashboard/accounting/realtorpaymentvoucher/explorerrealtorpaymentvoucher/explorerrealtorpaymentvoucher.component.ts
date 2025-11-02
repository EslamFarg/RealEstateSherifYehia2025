import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RealtorpaymentvoucherService } from '../services/realtorpaymentvoucher.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-explorerrealtorpaymentvoucher',
  templateUrl: './explorerrealtorpaymentvoucher.component.html',
  styleUrl: './explorerrealtorpaymentvoucher.component.scss'
})
export class ExplorerrealtorpaymentvoucherComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services;
_realtorpaymentvoucherService:RealtorpaymentvoucherService=inject(RealtorpaymentvoucherService)
destroyRef:DestroyRef=inject(DestroyRef)

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties;

  

  dataFilter=['رقم السند','اسم السمسار','رقم العقد']
  // _

  
   vouchersData:any = [];

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
  let shapeSearch:any={
     "brockerPaymentId": null,
  "contractId": null,
  "brockerName": null,
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  }
}
if(e.index== 0){
shapeSearch.brockerPaymentId=e.value
}else if(e.index == 1){
  shapeSearch.brockerName=e.value;
}else if(e.index == 2){
  shapeSearch.contractId=e.value;
}




this._realtorpaymentvoucherService.filterSearch(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
  console.log(res);
  this.vouchersData=res
});


}
}
