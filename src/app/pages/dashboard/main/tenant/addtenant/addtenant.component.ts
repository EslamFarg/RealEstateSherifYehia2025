import { Component, DestroyRef, inject } from '@angular/core';
import { Apartments, nationality } from '../models/tenant';
import { SharedService } from '../../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Apartment } from '../../apartment/models/apartment';
import { FormBuilder, Validators } from '@angular/forms';
import { TenantService } from '../services/tenant.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';
import { CheckEmail } from '../../../../../shared/validations/emailValidation';
import { checkUsername } from '../../../../../shared/validations/checkUsername';
import { saudiPhoneValidator } from '../../../../../shared/validations/phoneNumber';

@Component({
  selector: 'app-addtenant',
  templateUrl: './addtenant.component.html',
  styleUrl: './addtenant.component.scss'
})
export class AddtenantComponent {
// pageHeading
  title='الرئيسيه';
  subtitle="المستاجر";
  descripition='اضافه مستاجر جديد'
  accountParent:any=[]

  subScription:any

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services !!!!!!!!!!!!!!!!!!!!1
  Shared_Services:SharedService=inject(SharedService)
  fb:FormBuilder=inject(FormBuilder)
  _tenantServices:TenantService=inject(TenantService);
  toastr:ToastrService=inject(ToastrService);
  $destroyRef:DestroyRef=inject(DestroyRef);
  _editBehaviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService);
  _sharedServices:SharedService=inject(SharedService)
  _router:Router=inject(Router)

  // getAllNationality
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  dataNationality:nationality[]=[]
  dataRelation:any[]=[]
  destoryRef:DestroyRef=inject(DestroyRef);
  dataDependants:any[]=[]
  tenantForm=this.fb.group({
    Name:['',[Validators.required,Validators.minLength(3),checkUsername.ValidationUsername()]],
    TenantType:[null,[Validators.required]],
    Nationality:[null,[Validators.required]],
    Mobile:['',[Validators.required,saudiPhoneValidator.phoneNumberValidator]],
    Email:['',[CheckEmail.ValidationEmail()]],
    NationalID:['',[Validators.required,Validators.minLength(10)]],
    JobTitle:['',[Validators.required]],
    ParentId:[null,[Validators.required]],
    Dependants:this.fb.control<Apartments[]>([]),
    Files:[null]
  })


  DependantsForm:any=this.fb.group({
    Name:['',[Validators.required,Validators.minLength(3),checkUsername.ValidationUsername()]],
    phoneNumber:['',[Validators.required,saudiPhoneValidator.phoneNumberValidator]],
    nationalID:['',[Validators.required,Validators.minLength(10)]],
    nationality:[null,[Validators.required]],
    relation:[null,[Validators.required]],

  })



  indexEdit:any
  btnaddandupdateMoraphk='add'
  btnaddandupdate='add';
  idEdit:any
  dataFiles:any=[];
  idRemoveFiles:any =[]
  showDelete=false
  deleteId:any

    apartmentsData: Apartments[] = [
  
];

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Methods !!!!!!!!!!!!!!!!!!!!!!!!!1

ngOnInit(): void {
  this.getAllNationality();
  this.getAllRelations();
  this.getAllFinicalData();

  this._editBehaviorServices.idSubscribe.pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((id)=>{
    if(id){
      this.idEdit=id;
      this.btnaddandupdate='update';
      this._tenantServices.getDataUpdate(id).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
        console.log(res);
        this.tenantForm.patchValue({
          Name:res.name,
          TenantType:res.tenantType,
          Nationality:res.nationality,
          Mobile:res.mobile,
          Email:res.email,
          ParentId:res.parentId,
          NationalID:res.nationalID,
          JobTitle:res.jobTitle,
          Dependants:res.dependants,
          Files:res.attachments
        })
        // this.idUpdate=res.id
        // this.apartmentsData=res.dependants
        this.dataFiles=res.attachments

        console.log(this.dataFiles)
        this.apartmentsData = res.dependants || [];
        this.dataDependants = res.dependants || [];
      })


    }else{
      this.btnaddandupdate='add';

      // this._router.navigate(['/dashboard/tenant/explorertenant']);
    }
  })
  
}
  getAllNationality(){

    this.Shared_Services.getAllNationality().pipe(takeUntilDestroyed(this.destoryRef)).subscribe((res:any)=>{
     this.dataNationality= res.nationalities.map((item:any)=>({
      code:item.code,
      nationality_ar:item.nationality_ar
      }))
    })
    
  }

  getAllRelations(){
    this.Shared_Services.getAllRelations().pipe(takeUntilDestroyed(this.destoryRef)).subscribe((res:any)=>{
      this.dataRelation=res.relations.map((item:any)=>({
        id:item.id,
        relation_ar:item.relation_ar
      }))
    })
  }




onSubmit(){
  


  if(this.tenantForm.valid){


   if(this.btnaddandupdate == 'add'){
    
    let formData=new FormData();


    formData.append('Name',this.tenantForm.value.Name || '' );
    formData.append('TenantType',this.tenantForm.value.TenantType || '' );
    formData.append('Nationality',this.tenantForm.value.Nationality || '' );
    formData.append('Mobile',this.tenantForm.value.Mobile || '' );
    formData.append('Email',this.tenantForm.value.Email || '' );
    formData.append('NationalID',this.tenantForm.value.NationalID || '' );
    formData.append('JobTitle',this.tenantForm.value.JobTitle || '' );
    formData.append('ParentId',this.tenantForm.value.ParentId || '' );
    
    let files= this.tenantForm.value.Files || [];
    files.forEach(file=>{
      formData.append('Files',file);
    })

    this.dataDependants.forEach((item:any,index:any)=>{
      formData.append(`Dependants[${index}].Name`,item.name || '');
      formData.append(`Dependants[${index}].mobile`,item.mobile || '');
      formData.append(`Dependants[${index}].nationalID`,item.nationalID || '');
      formData.append(`Dependants[${index}].nationality`,item.nationality || '');
      formData.append(`Dependants[${index}].relation`,item.relation || '');
    })
    
    this._tenantServices.createTenant(formData).pipe(takeUntilDestroyed(this.destoryRef)).subscribe((res:any)=>{
      this.tenantForm.reset();
      this.dataDependants=[]; 
      this.apartmentsData=[]; 
      this.btnaddandupdate='add'
      this.toastr.show('تم اضافه المستاجر بنجاح','success');
    })

   
   }else{
    // update

    
    let dataform=new FormData();

    dataform.append('Id',this.idEdit);

    dataform.append('Name',this.tenantForm.value.Name || '' );
    dataform.append('TenantType',this.tenantForm.value.TenantType || '' );
    dataform.append('Nationality',this.tenantForm.value.Nationality || '' );
    dataform.append('Mobile',this.tenantForm.value.Mobile || '' );
    dataform.append('Email',this.tenantForm.value.Email || '' );
    dataform.append('NationalID',this.tenantForm.value.NationalID || '' );
    dataform.append('JobTitle',this.tenantForm.value.JobTitle || '' );
    dataform.append('ParentId',this.tenantForm.value.ParentId || '' );
    
    let files= this.tenantForm.value.Files || [];
    files.forEach(file=>{
      dataform.append('NewFiles',file);
    })

     this.dataDependants.forEach((item:any,index:any)=>{
      dataform.append(`Dependants[${index}].Name`,item.name || '');
      dataform.append(`Dependants[${index}].mobile`,item.mobile || '');
      dataform.append(`Dependants[${index}].nationalID`,item.nationalID || '');
      dataform.append(`Dependants[${index}].nationality`,item.nationality || '');
      dataform.append(`Dependants[${index}].relation`,item.relation || '');
    })

    this.idRemoveFiles.forEach((id: any) => dataform.append('RemovedAttachmentIds', id));

    this._tenantServices.updateData(dataform).pipe(takeUntilDestroyed(this.destoryRef)).subscribe((res:any)=>{
      this.tenantForm.reset();
      this.dataDependants=[]; 
      this.apartmentsData=[]; 
      this.btnaddandupdate='add'
      this.toastr.show('تم تعديل المستاجر بنجاح','success');
    })

   }

  }else{
    this.tenantForm.markAllAsTouched();
  }
}

onSubmitDependents(){

  if(this.DependantsForm.valid){
 if(this.btnaddandupdateMoraphk=='add'){
   const data:any = {
      name: this.DependantsForm.value.Name ?? '',
      mobile: this.DependantsForm.value.phoneNumber ?? '',
      nationalID: this.DependantsForm.value.nationalID ?? '',
      nationality: this.DependantsForm.value.nationality ?? '',
      relation: this.DependantsForm.value.relation ?? '',
    };

    this.dataDependants.push(data);
    this.apartmentsData.push(data);
    this.tenantForm.get('Dependants')?.setValue(this.dataDependants);
    // console.log(this.dataDependants);
    // console.log(this.tenantForm.value)
    this.DependantsForm.reset(); // لو حابب تمسح القيم بعد الإضافة
    this.btnaddandupdateMoraphk='add'
 }else{
  //!!!!!!!!!!! Update

  const data:any = {
    name: this.DependantsForm.value.Name ?? '',
    mobile: this.DependantsForm.value.phoneNumber ?? '',
    nationalID: this.DependantsForm.value.nationalID ?? '',
    nationality: this.DependantsForm.value.nationality ?? '',
    relation: this.DependantsForm.value.relation ?? '',
  };
  this.dataDependants[this.indexEdit]=data;
  this.apartmentsData[this.indexEdit]=data;
  this.tenantForm.get('Dependants')?.setValue(this.dataDependants);
  this.DependantsForm.reset(); 
  this.btnaddandupdateMoraphk='add'

 }
    
  }else{
    this.DependantsForm.markAllAsTouched();
  }
}


OnDataFiles(valueDataFiles:any){
  // console.log(valueDataFiles)
  this.tenantForm.get('Files')?.setValue(valueDataFiles);

}

editmorafqa(index:any){

   const item = this.dataDependants[index];


  this.DependantsForm.get('Name')?.setValue(this.dataDependants[index].name);
  this.DependantsForm.get('phoneNumber')?.setValue(this.dataDependants[index].mobile);
  
    this.DependantsForm.get('nationalID')?.setValue(this.dataDependants[index].nationalID)
//  ?? );
  this.DependantsForm.get('nationality')?.setValue(this.dataDependants[index].nationality);
  this.DependantsForm.get('relation')?.setValue(this.dataDependants[index].relation);
  this.indexEdit=index
  this.btnaddandupdateMoraphk='update'





}



deleteMoraphk(index:any){
  this.dataDependants.splice(index,1);
  this.apartmentsData.splice(index,1);
  this.tenantForm.get('Dependants')?.setValue(this.dataDependants);
  this.DependantsForm.reset();
}


resetForms(){
  this.tenantForm.reset();
  this.dataDependants=[]; 
  this.apartmentsData=[]; 
  this.btnaddandupdate='add'
  this.btnaddandupdateMoraphk='add'
  this.DependantsForm.reset();
  this._editBehaviorServices.clearId();
}


fnIdRemoveFiles(id:any){
  // console.log(e);
  
  this.dataFiles=this.dataFiles.filter((el:any)=>el.id != id);
  this.idRemoveFiles.push(id);
  console.log(this.idRemoveFiles)
}


onClose(){
  this.showDelete=false;
}

deleteConfirmed(id:any){

  this.showDelete=false;
  this._tenantServices.deleteData(id).pipe(takeUntilDestroyed(this.$destroyRef)).subscribe((res:any)=>{
    this.toastr.show('تم حذف المستاجر بنجاح','success');
    // this();
    // this._editBehaviorServices.clearId();
    this.resetForms();
    this.idEdit=0;
  })


}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this._editBehaviorServices.clearId();
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


deleteTenant(){
  this.showDelete=true
  this.deleteId=this.idEdit;
}

}
