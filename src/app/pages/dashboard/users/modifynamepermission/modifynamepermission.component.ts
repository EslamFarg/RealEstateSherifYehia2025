import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModifynamepermissionsService } from './services/modifynamepermissions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-modifynamepermission',
  templateUrl: './modifynamepermission.component.html',
  styleUrl: './modifynamepermission.component.scss'
})
export class ModifynamepermissionComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!! Services

fb:FormBuilder=inject(FormBuilder)
ModifynamepermissionsService:ModifynamepermissionsService=inject(ModifynamepermissionsService)
destroyRef:DestroyRef=inject(DestroyRef);
toastr:ToastrService=inject(ToastrService);
// !!!!!!!!!!!!!!!!!!!!!!!!! Properties


btnaddAndUpdate='update'
pagePermissionsData:any
showBtnUpdate=false;


pageIndex=1
  pageSize=10




modifyPermissionForm=this.fb.group({
  displayNameAr:['',[Validators.required]],
  displayNameEn:['',[Validators.required]],
  actionName:[''],
  controller:[''],
  httpType:['']
})


idUpdate:any

// !!!!!!!!!!!!!!!!!!!!!!!!!11 Methods


ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllDataPermissions();
}

onSubmit(){

  if(this.modifyPermissionForm.valid){

    let data={
      id:this.idUpdate,
      ...this.modifyPermissionForm.value
    }
    this.ModifynamepermissionsService.updateData(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.toastr.show('تم تعديل البيانات بنجاح','success');
      this.modifyPermissionForm.reset();
      this.getAllDataPermissions();
      this.showBtnUpdate=false
    })

  }else{
    this.modifyPermissionForm.markAllAsTouched();
  }

}

getDataUpdate(id:any){

  // //console.log(id);
  this.ModifynamepermissionsService.getDatabyid(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    //console.log('RRRRRR',res);
    this.idUpdate=res.id
    this.modifyPermissionForm.patchValue({displayNameAr:res.displayNameAr,displayNameEn:res.displayNameEn,
      actionName:res.actionName,controller:res.controller,httpType:res.httpType
    })
    this.showBtnUpdate=true
  })
}


deleteData(id:any){

}


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.getAllDataGroup();

  this.getAllDataPermissions();
}


getAllDataPermissions(){
  this.ModifynamepermissionsService.getAllPermissions(this.pageIndex,this.pageSize).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.pagePermissionsData=res
    //console.log(res);
  })
}


resetForm(){
  this.modifyPermissionForm.reset();
  this.idUpdate=null
  this.showBtnUpdate=false
}
}
