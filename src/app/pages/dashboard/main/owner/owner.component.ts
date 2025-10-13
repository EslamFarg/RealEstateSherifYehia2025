import { Component, DestroyRef, inject } from '@angular/core';
import { Owner } from './models/owner';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { saudiPhoneValidator } from '../../../../shared/validations/phoneNumber';
import { OwnerService } from './services/owner.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property


  title='الرئيسيه'
  subtitle="المالك"
btnAddAndUpdate='add'  
showDelete=false;
deleteId:any

  
  // pagination

pageIndex=1
pageSize=10

  ownerData=this.fb.group({
    Name:['',[Validators.required,Validators.minLength(3)]],
    Mobile:['',[Validators.required,saudiPhoneValidator.phoneNumberValidator]],
    Email:['',[Validators.required,Validators.email]],
    NationalID:['',[Validators.required,Validators.minLength(10)]],
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
}
onPageChanged(page: number) {
  this.pageIndex = page;
this.getAllDataOwner();
}


onSubmit(){
  if(this.ownerData.valid){


    if(this.btnAddAndUpdate == 'add'){

       let formData=new FormData();


    formData.append('Name',this.ownerData.value.Name || '');
    formData.append('Mobile',this.ownerData.value.Mobile || '');
    formData.append('Email',this.ownerData.value.Email || '');
    formData.append('NationalID',this.ownerData.value.NationalID || '');

    const files: File[] = this.ownerData.value.Files || [];

    files.forEach(file=>{
      formData.append('Files',file);
    })

    


    this._ownerServices.createOwner(formData).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
      this.ownerData.reset();
      this.btnAddAndUpdate='add'
      this.toastr.show('تم اضافه المالك بنجاح','success');
      this.getAllDataOwner();
    })
    
    }else{
      // Update
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
        Files:res.attachments
      })
   
      
       this.dataFiles=res.attachments

      this.btnAddAndUpdate='update'
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
  })
}


showDeletePopup(id:any){

  if(id){
    this.showDelete=true;
    this.deleteId=id
  }

}
}
