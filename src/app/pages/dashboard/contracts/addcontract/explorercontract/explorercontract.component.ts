import { Component, DestroyRef, inject } from '@angular/core';
import { AddcontractService } from '../services/addcontract.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorercontract',
  templateUrl: './explorercontract.component.html',
  styleUrl: './explorercontract.component.scss'
})
export class ExplorercontractComponent {

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Services

  _addContractService:AddcontractService=inject(AddcontractService)
  toastr:ToastrService=inject(ToastrService);
  destroyRef:DestroyRef=inject(DestroyRef)
  editBehaviorService:EditBehaviorServiceService=inject(EditBehaviorServiceService)
  router:Router=inject(Router)



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties
 
  dataFilter=['رقم العقد','اسم المستأجر','اسم الوحده']


  getAllData:any= [];


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


ngOnInit(){
  this.getAllDataContracts();
}
// pagination

pageIndex=1
pageSize=10



onPageChanged(page: number) {
  this.pageIndex = page;
  this.getAllDataContracts();
}


getAllDataContracts(){  
  let pagination={
  "paginationInfo": {
    "pageIndex": this.pageIndex,
    "pageSize": this.pageSize
  }
}
this._addContractService.getAllDataContracts(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
  console.log(res);
  this.getAllData=res
})

}
onSelectedPagination(page:any){
  this.pageSize=page;
  this.getAllDataContracts();

}


onSearchFilter(e:any){


  let shapeSearch={
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
  console.log(e);

  if(e.index==0){
    shapeSearch.searchFilter.column= 0;
  }else if(e.index==1){

    shapeSearch.searchFilter.column= 12;
  }else if(e.index==2){
    shapeSearch.searchFilter.column= 7;
  }

  this._addContractService.searchByContract(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res=>{
    console.log(res);
    this.getAllData=res
  }
  )

}



showDelete=false;
deleteId:any;


showPopupDelete(id:any){
  this.showDelete=true;
  console.log(id);
  this.deleteId=id;

}


deleteConfirmed(id:any){
  this.showDelete=false;
  this._addContractService.deleteContract(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.toastr.show("تم الحذف بنجاح",'success');
    this.getAllDataContracts();

  })
}

onClose(){
  this.showDelete=false;
}


sendIdToContracts(id:any){
  console.log(id);
  // this._addContractService.contractId=id;
  this.editBehaviorService.setId(id);
  this.router.navigate(['/dashboard/addcontract/newaddcontract']);

}
}
