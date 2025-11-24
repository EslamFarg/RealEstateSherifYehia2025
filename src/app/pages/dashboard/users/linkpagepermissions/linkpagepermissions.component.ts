import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LinkpagepermissionsService } from './services/linkpagepermissions.service';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-linkpagepermissions',
  templateUrl: './linkpagepermissions.component.html',
  styleUrl: './linkpagepermissions.component.scss'
})
export class LinkpagepermissionsComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

fb:FormBuilder=inject(FormBuilder)
_SharedServices:SharedService=inject(SharedService)
destroyRef:DestroyRef=inject(DestroyRef);
_linkPagePermissionsServices:LinkpagepermissionsService=inject(LinkpagepermissionsService)
toastr:ToastrService=inject(ToastrService)

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties

pageIndex=1
  pageSize=10

btnaddAndUpdate='add'
idUpdate:any

permissionForm:any

pagePermissionsData:any = [];

deleteId:any

showDelete=false;
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


ngOnInit(): void {
  this.getAllPages();
  this.getAllPermissions();
  this.getAllDataPageAndPermissions();
  this.permissionForm=this.fb.group({
    pageId:[null,[Validators.required]],
    actionIds:[[],[Validators.required]]
  })
}



onSubmit(){
  //console.log(this.permissionForm.value)

  if(this.permissionForm.valid){

   if(this.btnaddAndUpdate == 'add'){
 this._linkPagePermissionsServices.addPagePermission(this.permissionForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      //console.log(res)
      this.toastr.show('تم حفظ البيانات بنجاح','success');
      this.permissionForm.reset();
    })
   }else{
    let data={
      id:this.idUpdate,
      ...this.permissionForm.value
    }
    this._linkPagePermissionsServices.updateDataPageActionsById(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      //console.log(res)
      this.toastr.show('تم تعديل البيانات بنجاح','success');
      this.permissionForm.reset();
      this.btnaddAndUpdate='add'
    })
   }


    

  }else{
    this.permissionForm.markAllAsTouched();
  }

}


getDataUpdate(id:any){

  //console.log(id)
  
  this._linkPagePermissionsServices.getDatapageActionsById(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    //console.log(res);
    this.idUpdate=res.pageId;
      const actionIds = res.rows[0].actions.map((action: any) => action.actionId);
    this.permissionForm.patchValue({
      pageId:res.rows[0].pageId,
      actionIds:actionIds
      

    })
   

    this.btnaddAndUpdate='update'
  })
}

deleteData(id:any){

}

onPageChanged(page: number) {
  this.pageIndex = page;
  // this.getAllDataGroup();
  this.getAllDataPageAndPermissions();
}

getAllPagesData:any

getAllPages(){
  this._SharedServices.getAllPages(0,0).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
 
    this.getAllPagesData=res.rows
  })
}

getAllPermissionsData:any

getAllPermissions(){
  this._SharedServices.getAllPermissions(0,0).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.getAllPermissionsData=res.rows

    
  })
}


getAllDataPageAndPermissions(){
  this._linkPagePermissionsServices.getAllDataPagePermission(this.pageIndex,this.pageSize).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.pagePermissionsData=res

    //console.log(this.pagePermissionsData)
  })
}


// get(id:any){

// }

showPopupDelete(id:any){
  this.showDelete=true;
  this.deleteId=id;
}
deleteConfirmed(id:any){
this.showDelete=false;
this._linkPagePermissionsServices.deleteData(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  this.toastr.show('تم حذف البيانات بنجاح','success');
  this.getAllDataPageAndPermissions();
  this.resetForm();
  this.btnaddAndUpdate='add';
  this.idUpdate=null;
})
}


onClose(){
  this.showDelete=false
}


resetForm(){
  this.permissionForm.reset();
  this.idUpdate=null
  this.btnaddAndUpdate='add'
}

}
