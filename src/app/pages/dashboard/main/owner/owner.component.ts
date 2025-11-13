import { Component, DestroyRef, inject } from '@angular/core';
import { Owner } from './models/owner';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { saudiPhoneValidator } from '../../../../shared/validations/phoneNumber';
import { OwnerService } from './services/owner.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedService } from '../../../../shared/services/shared.service';
import { checkUsername } from '../../../../shared/validations/checkUsername';
import { CheckEmail } from '../../../../shared/validations/emailValidation';
import { PhoneValidator } from '../../../../shared/validations/phoneNumber2';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss'
})
export class OwnerComponent {


   // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
  toastr:ToastrService=inject(ToastrService);
  fb:FormBuilder=inject(FormBuilder)
  _ownerServices:OwnerService=inject(OwnerService)
  $destroyRef:DestroyRef=inject(DestroyRef)
  _sharedServices:SharedService=inject(SharedService);



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property


  title='الرئيسيه'
  subtitle="المالك"
btnAddAndUpdate='add'  
showDelete=false;
deleteId:any
idUpdate:any
idRemoveFiles:any =[] 

accountParent:any=[];
  // pagination

pageIndex=1
pageSize=10

  ownerData=this.fb.group({
    Name:['',[Validators.required,Validators.minLength(3),checkUsername.ValidationUsername()]],
    Mobile:['',[Validators.required,saudiPhoneValidator.phoneNumberValidator]],
    Email:['',[Validators.required,CheckEmail.ValidationEmail()]],
    NationalID:['',[Validators.required,Validators.minLength(10)]],
    parentId: [null,[Validators.required]],
    financiallyAccountId: [0], 
    Files:[null]
  })


  


 





    // dataView
    getAllData: {rows: Owner[] , paginationInfo:any} = {
      rows:[],
      paginationInfo:null
    }



    dataFiles:any[]=[]


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111



ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllDataOwner();
  this.getAllFinicalData();

}
onPageChanged(page: number) {
  this.pageIndex = page;
this.getAllDataOwner();
}


onSubmit(){


  console.log(this.ownerData.value);
  // debugger;
  if(this.ownerData.valid){


    if(this.btnAddAndUpdate == 'add'){

       let formData=new FormData();


    formData.append('Name',this.ownerData.value.Name || '');
    formData.append('Mobile',this.ownerData.value.Mobile || '');
    formData.append('Email',this.ownerData.value.Email || '');
    formData.append('NationalID',this.ownerData.value.NationalID || '');
    formData.append('parentId',this.ownerData.value.parentId || '');

    const files: File[] = this.ownerData.value.Files || [];

    files.forEach(file=>{
      formData.append('Files',file);
    })

    


    this._ownerServices.createOwner(formData).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
      this.toastr.show('تم اضافه المالك بنجاح','success');
      this.btnAddAndUpdate='add'



     
      this.dataFiles=[];
      this.idUpdate = null;
      this.resetData();
//  this.ownerData.reset({
//     Name: '',
//     Mobile: '',
//     Email: '',
//     NationalID: '',
//     parentId: null,
//     financiallyAccountId: 0,
//     Files: null
//   });

      this.idRemoveFiles = [];
   
      
      this.getAllDataOwner();
      this.ownerData.markAsPristine();
this.ownerData.markAsUntouched();
this.ownerData.updateValueAndValidity();
    })
    
    }else{
      // Update

const params = new URLSearchParams({
  Id: this.idUpdate,
  Name: this.ownerData.value.Name ?? '',
  Mobile: this.ownerData.value.Mobile ?? '',
  Email: this.ownerData.value.Email ?? '',
  NationalID: this.ownerData.value.NationalID ?? '',
  parentId: this.ownerData.value.parentId ?? ''
});
this.idRemoveFiles.forEach((id: any) => params.append('RemovedAttachmentIds', id));
const queryParams = params.toString();



      let formData = new FormData();

// نرسل فقط الملفات الحقيقية
const files: any[] = this.ownerData.value.Files || [];
files
  .filter(file => file instanceof File)
  .forEach(file => formData.append('NewFiles', file));



    this._ownerServices.updateData(queryParams,formData).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
      this.ownerData.reset();
   
      this.toastr.show('تم تعديل المالك بنجاح','success');
       
             // ✅ إعادة التهيئة بشكل صحيح
    this.btnAddAndUpdate = 'add';
    this.idUpdate = null;
    this.idRemoveFiles = [];
    this.dataFiles = [];

      this.getAllDataOwner();
    })



    }

   
    



  }else{

    this.ownerData.markAllAsTouched();

  }
}


getAllDataOwner(){

  let pagination={
  paginationInfo: {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  }
}

  this._ownerServices.getAllDataOwner(pagination).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    this.getAllData=res;
  })

}

OnDataFiles(ValueDataFiles:any){
    this.dataFiles = ValueDataFiles;  
  this.ownerData.get('Files')?.setValue(ValueDataFiles);
 
}


getDataUpdate(id:any){
  if(id){
    this._ownerServices.getDataUpdate(id).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{

      this.ownerData.patchValue({
        Name:res.name,
        Mobile:res.mobile,
        Email:res.email,
        NationalID:res.nationalID,
        parentId:res.parentId,
        Files:res.attachments
      })
   
      
       this.dataFiles=res.attachments
      this.idUpdate=res.id
      this.btnAddAndUpdate='update'
        // console.log(this.dataFiles)
    })


   


    
  }

}


onClose(){
  this.showDelete=false;
}


deleteConfirmed(e:any){
  this.showDelete=false;
  console.log(e);
  this._ownerServices.deleteData(e).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف المالك بنجاح','success');
    this.getAllDataOwner();
    this.ownerData.reset();
    this.btnAddAndUpdate='add';
    
  })
}


showDeletePopup(id:any){

  if(id){
    this.showDelete=true;
    this.deleteId=id
  }

}


getAllFinicalData(){

  let pagination={
  paginationInfo: {
    pageIndex: 0,
    pageSize: 0
  }
}

  this._sharedServices.getAllfinancialData(pagination).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    console.log(res);
    this.accountParent=res;
  })
  

}

fnIdRemoveFiles(id:any){

  this.dataFiles=this.dataFiles.filter((el:any)=>el.id != id);
  this.idRemoveFiles.push(id);
  

}

resetData() {
  this.btnAddAndUpdate = 'add';
  this.dataFiles = [];
  this.idUpdate = null;
  this.idRemoveFiles = [];

  this.ownerData.reset({
    Name: '',
    Mobile: '',
    Email: '',
    NationalID: '',
    parentId: null,
    financiallyAccountId: 0,
    Files: null
  });

  this.ownerData.markAsPristine();
  this.ownerData.markAsUntouched();
  this.ownerData.updateValueAndValidity();
}



}
