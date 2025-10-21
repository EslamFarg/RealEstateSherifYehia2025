import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaindataService } from '../services/maindata.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { SharedService } from '../../../../../shared/services/shared.service';

@Component({
  selector: 'app-programsettings',
  templateUrl: './programsettings.component.html',
  styleUrl: './programsettings.component.scss'
})
export class ProgramsettingsComponent {
  // !!!!!!!!!!!!!!!!!!!!!!111 Services

  fb:FormBuilder=inject(FormBuilder);
  _mainDataServices:MaindataService=inject(MaindataService);
  destroyRef:DestroyRef=inject(DestroyRef)
  toastr:ToastrService=inject(ToastrService);
  _sharedServices:SharedService=inject(SharedService);




  // !!!!!!!!!!!!!!!!!!!!!!!!!! Property


  systemSettings=this.fb.group({
  companyNameAr: ['',[Validators.required,Validators.minLength(3)]],
  companyNameEn: ['',[Validators.required,Validators.minLength(3)]],
  taxNumber: ['',Validators.required],
  commercialRegister: ['',Validators.required],
  email: ['',Validators.required],
  website: ['',Validators.required],
  phone: ['',Validators.required],
  fax: ['',Validators.required],
  mobile: ['',Validators.required],
  region: ['marco',Validators.required],
  city: [null,Validators.required],
  district: [null,Validators.required],
  street: [null,Validators.required],
  postalCode: ['',Validators.required],
  buildingNumber: ['',Validators.required],
  taxRate: [null,Validators.required],
  isTaxEnabled: [true,Validators.required]
  })

  getDataCities:any[]=[]
  getDataDistricts:any[]=[]


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  ngOnInit(){
    this.getAllCities();
    
  }


  onSubmit(){
    if(this.systemSettings.valid){
      let data={
         companyNameAr: this.systemSettings.value.companyNameAr,
  companyNameEn: this.systemSettings.value.companyNameAr,
  taxNumber: this.systemSettings.value.taxNumber,
  commercialRegister: this.systemSettings.value.commercialRegister,
  email: this.systemSettings.value.email,
  website: this.systemSettings.value.website,
  phone:  this.systemSettings.value.phone,
  fax: this.systemSettings.value.fax,
  mobile: this.systemSettings.value.mobile,
  region: this.systemSettings.value.region,
  city: this.systemSettings.value.city,
  district: this.systemSettings.value.district,
  street: this.systemSettings.value.street,
  postalCode: this.systemSettings.value.postalCode,
  buildingNumber: this.systemSettings.value.buildingNumber,
  taxRate: this.systemSettings.value.taxRate,
  isTaxEnabled: this.systemSettings.value.isTaxEnabled
      }



      this._mainDataServices.createSystemSettings(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        this.toastr.show('تم حفظ البيانات بنجاح','success');
        this.systemSettings.reset({
          isTaxEnabled: this.systemSettings.value.isTaxEnabled
        });
      })

    }else{
      this.systemSettings.markAllAsTouched();
    }
  }


  getAllCities(){
    this.getDataCities= this._sharedServices.allCities;
  }



  onCityChange(e:any){

      if (!e) {
    this.getDataDistricts = [];
    this.systemSettings.patchValue({ district: null });
    return;
  }

     const id=e.city_id;
    if(id){
    this.getDataDistricts=this._sharedServices.allDistricts.filter((item:any)=>item.city_id == id);
    console.log(this.getDataDistricts)
    }else{
      this.getDataDistricts=[];
    }
   
    

   
    
  }
}
