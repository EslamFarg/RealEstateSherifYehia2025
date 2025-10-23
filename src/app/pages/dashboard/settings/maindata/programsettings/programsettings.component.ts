import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaindataService } from '../services/maindata.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { SharedService } from '../../../../../shared/services/shared.service';

@Component({
  selector: 'app-programsettings',
  templateUrl: './programsettings.component.html',
  styleUrl: './programsettings.component.scss',
})
export class ProgramsettingsComponent {
  // !!!!!!!!!!!!!!!!!!!!!!111 Services

  fb: FormBuilder = inject(FormBuilder);
  _mainDataServices: MaindataService = inject(MaindataService);
  destroyRef: DestroyRef = inject(DestroyRef);
  toastr: ToastrService = inject(ToastrService);
  _sharedServices: SharedService = inject(SharedService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!! Property

  systemSettings = this.fb.group({
    companyNameAr: ['', [Validators.required, Validators.minLength(3)]],
    companyNameEn: ['', [Validators.required, Validators.minLength(3)]],
    taxNumber: ['', Validators.required],
    commercialRegister: ['', Validators.required],
    email: ['', Validators.required],
    website: ['', Validators.required],
    phone: ['', Validators.required],
    fax: ['', Validators.required],
    mobile: ['', Validators.required],
    region: [null, Validators.required],
    city: [null, Validators.required],
    district: [null, Validators.required],
    street: [null, Validators.required],
    postalCode: ['', Validators.required],
    buildingNumber: ['', Validators.required],
    taxRate: [null, Validators.required],
    isTaxEnabled: [true, Validators.required],
  });

  getDataCities: any[] = [];
  getDataDistricts: any[] = [];
  getDataRegions: any[] = [];

  nespaDarepa=[
    {
    name:'معفي',
    value:0,
  },
  {
    name:'ضريبه صفريه',
    value:0,
  },
  {
    name:'15%',
    value:15,
  },
  {
    name:'5%',
    value:5,
  }

]


btnAddandUpdate = 'add';
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  ngOnInit() {
    // this.getAllCities();
    this.getAllDataRegions();
  }

  onSubmit() {
    if (this.systemSettings.valid) {
    if(this.btnAddandUpdate == 'add' || this.btnAddandUpdate=='update'){
        let data = {
        companyNameAr: this.systemSettings.value.companyNameAr,
        companyNameEn: this.systemSettings.value.companyNameEn,
        taxNumber: this.systemSettings.value.taxNumber,
        commercialRegister: this.systemSettings.value.commercialRegister,
        email: this.systemSettings.value.email,
        website: this.systemSettings.value.website,
        phone: this.systemSettings.value.phone,
        fax: this.systemSettings.value.fax,
        mobile: this.systemSettings.value.mobile,
        region: this.systemSettings.value.region,
        city: this.systemSettings.value.city,
        district: this.systemSettings.value.district,
        street: this.systemSettings.value.street,
        postalCode: this.systemSettings.value.postalCode,
        buildingNumber: this.systemSettings.value.buildingNumber,
        taxRate: this.systemSettings.value.taxRate,
        isTaxEnabled: this.systemSettings.value.isTaxEnabled,
      };

      this._mainDataServices
        .createSystemSettings(data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res: any) => {
          this.toastr.show('تم حفظ البيانات بنجاح', 'success');
          // this.systemSettings.reset({
          //   isTaxEnabled: this.systemSettings.value.isTaxEnabled,
          // });
        });
    }
    } else {
      this.systemSettings.markAllAsTouched();
    }
  }

  getAllDataRegions() {
    this.getDataRegions = this._sharedServices.allRegions;
    this.getAllDataSystemSettings();
  }

  onRegionChange(e: any) {
    if (!e) {
      this.getDataCities = [];
      this.systemSettings.patchValue({ city: null });
      return;
    }
    const id = e.region_id;
    if (id) {
      this.getDataCities = this._sharedServices.allCities.filter(
        (item: any) => item.region_id == id
      );
    } else {
      this.getDataCities = [];
    }
  }
 

  onCityChange(e: any) {
    if (!e) {
      this.getDataDistricts = [];
      this.systemSettings.patchValue({ district: null });
      return;
    }

    const id = e.city_id;
    if (id) {
      this.getDataDistricts = this._sharedServices.allDistricts.filter(
        (item: any) => {
          
          this.systemSettings.get('district')?.patchValue(null);
        
        return  item.city_id == id
        }
      );

      if (this.getDataDistricts.length > 0) {
      this.getDataDistricts = this.getDataDistricts;
    } else {
      
      this.getDataDistricts = [
        { name_ar: 'لا يوجد أحياء لهذا المكان', district_id: -1 }
      ];
    }
    } else {
      this.getDataDistricts = [];
    }
  }


  getAllDataSystemSettings(){
    this._mainDataServices.getDataSystemSettings().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.systemSettings.patchValue(res)
        this.btnAddandUpdate='update'
        
      }
      // this.systemSettings.patchValue(res)
    })
  }
}
