import { Component, DestroyRef, inject } from '@angular/core';
import { Tenant, TenantData } from '../models/tenant';
import { TenantService } from '../services/tenant.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-explorertenant',
  templateUrl: './explorertenant.component.html',
  styleUrl: './explorertenant.component.scss'
})
export class ExplorertenantComponent {

  // !!!!!!!!!!!!!!!!!!!!!!! Services

  _tenantServices:TenantService=inject(TenantService);
  $destroyRef=inject(DestroyRef)
  _editbehaviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService);
  _router:Router=inject(Router);
  toastr:ToastrService=inject(ToastrService)

  //!!!!!!!!!!!!!!!!!!!!!!! Property
  
  

  title='الرئيسيه'
  subtitle='المستأجر'
  showBtns=true
  AddTitle="اضافه مستاجر جديد"

  dataFilter=['اسم المستأجر','رقم الهويه','رقم الجوال']

  tenantData:{rows:TenantData[],paginationInfo:any} = {
    rows:[],
    paginationInfo:null
  }

// pagination

pageIndex=1
pageSize=10

showDelete=false;
deleteId:any


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


ngOnInit(): void {

  this.getAllDataTenant();
}
onPageChanged(page: number) {
  this.pageIndex = page;

  this.getAllDataTenant()
}



getAllDataTenant(){
  let pagination={
  paginationInfo: {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  }
}
  this._tenantServices.getAllDataTenant(pagination).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    this.tenantData=res;
  })
}


onSelectedPagination(val:any){
  console.log(val);
  this.pageSize=val
  this.getAllDataTenant();
}


getupdateData(id:any){
  // console.log(id);
  this._editbehaviorServices.setId(id);
  this._router.navigate(['/dashboard/tenant/addtenant']);
  


}


showDeletePopup(id:any){

  if(id){
    this.showDelete=true;
    this.deleteId=id
  }



}

deleteConfirmed(id:any){
  this.showDelete=false;
  // this.deleteId=id;

  this._tenantServices.deleteData(id).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف المستاجر بنجاح','success');
    this.getAllDataTenant();
  })
}

onClose(){
  this.showDelete=false;
}


}
