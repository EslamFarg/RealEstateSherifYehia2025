import { Component, DestroyRef, inject } from '@angular/core';
import { SalaryDisbursementService } from '../services/salary-disbursement.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorer-salary-disbursement',
  templateUrl: './explorer-salary-disbursement.component.html',
  styleUrl: './explorer-salary-disbursement.component.scss'
})
export class ExplorerSalaryDisbursementComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

  salaryDisbursementService=inject(SalaryDisbursementService)
  destroyRef:DestroyRef=inject(DestroyRef);
  toastr:ToastrService=inject(ToastrService);
  editBehaviorServiceService=inject(EditBehaviorServiceService)
  router:Router=inject(Router)


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property

dataFilter=["رقم السند",'التاريخ']

// pagination

pageIndex=1
pageSize=10
vouchersAllData:any = [
  
];






// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Method

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  this.getAllData();
}

onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
  this.getAllData()
}


getAllData() {
  let pagination = {
    paginationInfo: {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
  }

  this.salaryDisbursementService.getAllData(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
    this.vouchersAllData = res;
  })
}



onSearchFilter(e:any){
  if(!e){
    return;
  }
  
  let shapeSearch={
  "searchRequest": {
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
}
  
  if(e.index==0){
    shapeSearch.searchRequest.searchFilter.column= 0;
  }else if(e.index== 1){
    shapeSearch.searchRequest.searchFilter.column= 1;
  }

  this.salaryDisbursementService.searchData(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
    this.vouchersAllData=res
  })
}


onSelectedPagination(e:any){
  this.pageSize=e;
  this.getAllData();
}


showDelete=false
deleteId:any
showDeletePopup(id:any){
  this.showDelete=true
  this.deleteId=id

}

deleteConfirmed(id:any){
  this.showDelete=false;
  this.salaryDisbursementService.deletePayrollVoucher(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف البيانات بنجاح','success');
    this.getAllData();
  })
}


onClose(){
  this.showDelete=false
}


sendEditId(id:any){
  this.editBehaviorServiceService.setId(id)
  this.router.navigate(['/dashboard/salarydisbursement/addsalarydisbursement'])


}
}
