import { Component, DestroyRef, inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ConcatgrouppermissionsService } from './services/contactgrouppermissions.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedService } from '../../../../shared/services/shared.service';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-concatgrouppermissions',
  templateUrl: './concatgrouppermissions.component.html',
  styleUrl: './concatgrouppermissions.component.scss'
})
export class ConcatgrouppermissionsComponent {
// !!!!!!!!!!!!!!!!!!!!!!!! Services
fb:FormBuilder=inject(FormBuilder)
contactgroupServices:ConcatgrouppermissionsService=inject(ConcatgrouppermissionsService)
_sharedServices:SharedService=inject(SharedService)
destroyRef:DestroyRef=inject(DestroyRef)
toastr:ToastrService=inject(ToastrService);

// !!!!!!!!!!!!!!!!!!!!!1 Properties

btnaddAndUpdate='add'

FormPermissionGroup:any=this.fb.group({
  groupId:[null,[Validators.required]],
  // permission:[null,[Validators.required]]
  items:this.fb.array([this.createItem()])
})


// !!!!!!!!!!!!!!!!!!!!!!!!1 Methods

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllDataGroup();
  this.getAllDataPages();
}

addPageAndPermission(){
  this.items.push(this.createItem())
  console.log('Add Data')
}


createItem(){

  return this.fb.group({
    pages:[null,[Validators.required]],
    pageActionsId:[[],[Validators.required]]
  })

}


get items():FormArray{
  return this.FormPermissionGroup.get('items') as FormArray
}


addItem(){
  this.items.push(this.createItem())
}
onSubmit(){

  let pageActionsId=this.FormPermissionGroup.value.items.map((item:any)=>item.pageActionsId).reduce((acc:any,curr:any)=>acc.concat(curr),[])
 

  if(this.FormPermissionGroup.valid){

    let data={
      groupId: this.FormPermissionGroup.value.groupId,
      pageActionsId: pageActionsId
    }

    // console.log(data);

    this.contactgroupServices.addPermission(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this.toastr.show('تم اضافه البيانات بنجاح','success');
      this.FormPermissionGroup.reset();
    })
    
  }else{
    this.FormPermissionGroup.markAllAsTouched();
  }


}


getDataGroup:any
getAllDataGroup(){
this.contactgroupServices.getAllDataGroup(``).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
 
  this.getDataGroup=res.rows;
  
})
}

getAllPages:any
getAllDataPages(){
this._sharedServices.getAllPages(0,0).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
 
  this.getAllPages=res.rows
})
}


getDataPermissions:any
changePages(e:any){
  let id=e.id
  console.log(id);
  this.contactgroupServices.getPermissionsbyPagesId(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    // console.log(res);
    this.getDataPermissions=res.rows
    console.log(this.getDataPermissions);
  })

}
}
