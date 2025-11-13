import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { checkUsername } from '../../../../shared/validations/checkUsername';
import { NewuserService } from './services/newuser.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { Newuser } from './models/newuser';
import { GroupmessageService } from '../../messages/groupmessage/services/groupmessage.service';
import { GroupService } from '../group/services/group.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.scss'
})
export class NewuserComponent {




//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

fb:FormBuilder=inject(FormBuilder);
_newUserServices:NewuserService=inject(NewuserService);
destroyRef:DestroyRef=inject(DestroyRef);
_toastrSer:ToastrService=inject(ToastrService);

groupServices:GroupService=inject(GroupService)

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property

getAllData:Newuser[]= []
btnAddAndUpdate='add'
idUpdate:any;
showDelete:any=false
deleteId:any

formData=this.fb.group({
  userName:['',[Validators.required,Validators.minLength(3),checkUsername.ValidationUsername()]],
  fullName:[JSON.parse(localStorage.getItem('payloadUser')!)?.fullName || 'sherif'],
  email:['',[Validators.required,Validators.email]],
  phoneNumber:['',Validators.required],
  password:['Sh12345678Sh'],
  // groupIds:[[],Validators.required],
   groupIds: this.fb.control<number[]>([]),
  isActive:[true,Validators.required]
})
  




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Methods
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllDataUser();
  this.getAllGroup()}

groupAllData:any=[];


getFc(name:any){

  return this.formData.get(name) as FormControl
}
onSubmit(){
let groupIds: any[] = [];

if (this.formData.value.groupIds) {
  if (Array.isArray(this.formData.value.groupIds)) {
    groupIds = this.formData.value.groupIds.map((id: any) => Number(id));
  } else {
    // إذا كانت قيمة واحدة فقط (object أو string)
    groupIds = [Number(this.formData.value.groupIds)];
  }
}

  if(this.formData.valid){


      if(this.btnAddAndUpdate=='add'){
         const groupIds = Array.isArray(this.formData.value.groupIds)
      ? this.formData.value.groupIds.map((id: any) => Number(id))
      : [Number(this.formData.value.groupIds)];

    let data={
      userName:this.formData.value.userName,
      fullName:this.formData.value.fullName,
      email:this.formData.value.email,
      phoneNumber:this.formData.value.phoneNumber,
      password:this.formData.value.password,
      isActive:this.formData.value.isActive,
      groupIds: groupIds
    
    }



    console.log(data)
    this._newUserServices.addNewUser(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this._toastrSer.show('تم اضافه المستخدم بنجاح','success');
      this.formData.reset();
      this.getAllDataUser();
    })

    
    this.btnAddAndUpdate='add'
  
  }else{

      const groupIds = Array.isArray(this.formData.value.groupIds)
      ? this.formData.value.groupIds.map((id: any) => Number(id))
      : [Number(this.formData.value.groupIds)];

    let data={
        userId: this.idUpdate,
        userName: this.formData.value.userName,
        fullName: this.formData.value.fullName,
        email:this.formData.value.email,
        phoneNumber: this.formData.value.phoneNumber,
        isActive: this.formData.value.isActive,
        groupIds: groupIds
    }

    this._newUserServices.UpdateData(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      this._toastrSer.show('تم تعديل المستخدم بنجاح','success');
      this.formData.reset();
      this.btnAddAndUpdate='add'
      this.getAllDataUser();
      
    })
    


  }
  
  


  

  }else{
    this.formData.markAllAsTouched();
  }
}




getAllDataUser(){
  this._newUserServices.getAllDataUser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this.getAllData=res;

  })
}






getUpdateData(id:any){
this.btnAddAndUpdate='update'
  this._newUserServices.getDataUpdate(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  this.idUpdate=res.userId
  this.formData.patchValue({
    userName:res.userName,
    email:res.email,
    phoneNumber:res.phoneNumber,
    isActive:res.isActive
    
  })

  
})
}



deleteModel(id:any){
  this.showDelete=true;
  this.deleteId=id;
}

onClose(){
  this.showDelete=false;
}



deleteConfirmed(e:any){
  this.showDelete=false;


  this._newUserServices.deleteData(this.deleteId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    this._toastrSer.show('تم حذف المستخدم بنجاح','success');
    this.getAllDataUser();
  })
}


  // pagination

pageIndex=1
pageSize=10


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}

getAllDataGroupName=[];
getAllGroup(){
  this.groupServices.getAllDataGroup({}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    console.log(res);
    this.getAllDataGroupName=res.rows
  })
}
}
