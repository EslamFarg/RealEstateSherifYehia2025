import { Component, DestroyRef, inject } from '@angular/core';
import { Realtor } from './models/realtor';
import { nationality } from '../tenant/models/tenant';
import { SharedService } from '../../../../shared/services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { saudiPhoneValidator } from '../../../../shared/validations/phoneNumber';
import { RealtorService } from './services/realtor.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrl: './realtor.component.scss'
})
export class RealtorComponent {




//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

shared_service:SharedService=inject(SharedService)
fb:FormBuilder=inject(FormBuilder);
_BrokerServices:RealtorService=inject(RealtorService)
$destroyRef:DestroyRef=inject(DestroyRef);
toastr:ToastrService=inject(ToastrService);


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! property !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

BrokerData=this.fb.group({
  Name: ['',[Validators.required,Validators.minLength(3)]],
  Mobile: ['',[Validators.required,saudiPhoneValidator.phoneNumberValidator]],
  Nationality: [null,[Validators.required]],
  Bonus: ['',[Validators.required]],
  NationalID:['',[Validators.required,Validators.minLength(10)]],
  Email:['',[Validators.required,Validators.email]],
  Files:[null]

})

dataNationality:nationality[]=[]

dataFiles:any[]=[]
idRemoveFiles:any =[] 
showDelete=false;
deleteId:any;
// :DestroyRef=inject(DestroyRef);


pageIndex=1
pageSize=10


  title='الرئيسيه'
  subtitle="السمسار"

   realtorData:{rows: Realtor[] , paginationInfo:any} = {
    rows:[],
    paginationInfo: null
   }

   idUpdate:any
   btnAddandUpdate='add';






//
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! methods !!!!!!!!!!!!!!!!!!!!!!!!1


ngOnInit(){
  this.getAllNationality();
  this.getAllDataRealtor();
}




getAllNationality(){
  this.shared_service.getAllNationality().subscribe((res:any)=>{
    this.dataNationality=res.nationalities.map((item:any)=>({
      code:item.code,
      nationality_ar:item.nationality_ar
    }))
  })
}

onSubmit(){

  if(this.BrokerData.valid){
    if(this.btnAddandUpdate=='add'){
      
    // let params=new URLSearchParams({
    
    //  })

    //  let queryData=params.toString();


    // let data={
    //     Name: this.BrokerData.value.Name ?? '',
    //   Mobile: this.BrokerData.value.Mobile ?? '',
    //   Nationality: this.BrokerData.value.Nationality ?? '',
    //   Bonus: this.BrokerData.value.Bonus ?? '',
    //   NationalID: this.BrokerData.value.NationalID ?? '',
    //   Email: this.BrokerData.value.Email ?? ''
    // }

    let formData=new FormData();


    formData.append('Name',this.BrokerData.value.Name || '');
    formData.append('Mobile',this.BrokerData.value.Mobile || '');
    formData.append('Nationality',this.BrokerData.value.Nationality || '');
    formData.append('Bonus',this.BrokerData.value.Bonus || '');
    formData.append('NationalID',this.BrokerData.value.NationalID || '');
    formData.append('Email',this.BrokerData.value.Email || '');


      const files: File[] = this.BrokerData.value.Files || []

      files.forEach(file=>{
      
        formData.append('Files',file);
      
      })


      this._BrokerServices.createRelator(formData).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
        this.toastr.show('تم اضافه السمسار بنجاح','success');
        this.BrokerData.reset();
        this.btnAddandUpdate='add';
        this.dataFiles=[];
        this.getAllDataRealtor();
      })
    }else{
      
      if (!this.idUpdate) {
  this.toastr.show('حدث خطأ: لم يتم تحديد السمسار المراد تعديله', 'error');
  return;
}
      
      let params=new URLSearchParams({
  Id: this.idUpdate ,
  Name: this.BrokerData.value.Name ?? '',
  Mobile: this.BrokerData.value.Mobile ?? '',
  Email: this.BrokerData.value.Email ?? '',
  NationalID: this.BrokerData.value.NationalID ?? '',
  Bonus:this.BrokerData.value.Bonus ?? '',
  Nationality:this.BrokerData.value.Nationality ?? ''

})

// params.append('Id', String(Number(this.idUpdate)));






this.idRemoveFiles.forEach((id:any)=>{

  params.append('RemovedAttachmentIds',id);
})



let queryParams=params.toString();


console.log(decodeURIComponent(queryParams));
let formData=new FormData();


const files: File[] = this.BrokerData.value.Files || []

files.forEach(file=>{

  formData.append('NewFiles',file);
})



this._BrokerServices.updateData(queryParams,formData).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
  this.toastr.show('تم تعديل السمسار بنجاح','success');
  this.BrokerData.reset();
  this.btnAddandUpdate='add';
  this.dataFiles=[];
  this.getAllDataRealtor();
})

    }
  }else{
    this.BrokerData.markAllAsTouched();
  }

}

onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}

OnDataFiles(ValueDataFiles:any){
  this.BrokerData.get('Files')?.setValue(ValueDataFiles);
 
}

getAllDataRealtor(){
  let pagination={
      paginationInfo: {
    pageIndex: this.pageIndex,
    pageSize: this.pageSize
  }
  }
  this._BrokerServices.getAllDataRealtor(pagination).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    this.realtorData=res;
  })
}


getUpdateData(id:any){

  this._BrokerServices.getDataUpdate(id).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    this.BrokerData.patchValue({
      Name:res.name,
      Mobile:res.mobile,
      Nationality:res.nationality,
      Bonus:res.bonus,
      NationalID:res.nationalID,
      Email:res.email
    })

    this.dataFiles=res.attachments
    this.idUpdate= id ?? res.id ?? res.Id;

    this.btnAddandUpdate='update'

  })

  

}

fnIdRemoveFiles(id:any){

  this.dataFiles=this.dataFiles.filter((el:any)=>el.id != id);
  this.idRemoveFiles.push(id);

  console.log(this.idRemoveFiles);
  

}


// showDelete(id:any){
//   this.showDelete=true;
//   this.deleteId=id

// }


// showDelete(id:any){
//   this.showDelete=true;
//   this.deleteId=id

// }

showDeletePopup(id:any){
  this.showDelete=true;
  this.deleteId=id;
}

deleteConfirmed(id:any){
  this.showDelete=false;
  this._BrokerServices.deleteData(id).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف السمسار بنجاح','success');
    this.getAllDataRealtor();
  })

}

onClose(){
  this.showDelete=false;
}
}
