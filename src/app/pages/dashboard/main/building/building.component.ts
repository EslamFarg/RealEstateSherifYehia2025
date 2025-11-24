import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { SharedService } from '../../../../shared/services/shared.service';
import { computeMsgId } from '@angular/compiler';
import { OwnerService } from '../owner/services/owner.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BuildingService } from './services/building.service';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { Building } from './models/building';
import { environment } from '../../../../../environments/environment';
import { checkUsername } from '../../../../shared/validations/checkUsername';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrl: './building.component.scss',
})
export class BuildingComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services
  _SharedServices: SharedService = inject(SharedService);
  _ownerServices: OwnerService = inject(OwnerService);
  $destroyRef: DestroyRef = inject(DestroyRef);
  fb: FormBuilder = inject(FormBuilder);
  _BuildingServices: BuildingService = inject(BuildingService);
  toastr: ToastrService = inject(ToastrService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property

  title = 'الرئيسيه';
  subtitle = 'العقار';

  buildingsData: { rows: Building[]; paginationInfo: any } = {
    rows: [],
    paginationInfo: null,
  };

  getAllDataCities: any[] = [];
  dataSelectCity: any;
  dataSelectdistrict: any;
  dataSelectNameOwner: any;
  dataFiles: any[] = [];
  @ViewChild('attachments', { static: false }) attachmentsComp: any;
  btnAddandUpdate = 'add';
  idUpdate: any;
  deleteId: any;
  idRemoveFilesArray: any = [];
  showDelete: any = false;

  formProperty: any = this.fb.group({
    PropertyNumber: [''],
    Name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        checkUsername.ValidationUsername(),
      ],
    ],
    OwnerID: [null, [Validators.required]],
    City: [null, [Validators.required]],
    District: [null, [Validators.required]],
    Street: ['', [Validators.required, Validators.minLength(3)]],
    BuildingNumber: ['', [Validators.required]],
    PostalCode: ['', [Validators.required, Validators.minLength(5)]],
    Description: [''],
    Files: [null],
  });

  // pagination

  pageIndex = 1;
  pageSize = 10;

  cities: {
    city_id: number;
    region_id: number;
    name_ar: string;
    name_en: string;
  }[] = this._SharedServices.allCities;

  districts: any = [];

  nameOwners: any;
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  ngOnInit() {
    // this.getallDataCity();
    this.getAllNameOwner();
    this.getAllDataProperties();
  }
  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDataProperties();
  }

  getFc(name: string) {
    return this.formProperty.get(name) as FormControl;
  }

  refreshPage() {
    location.reload();
  }

  OnSelectedCity(data: any) {
    if (!data) {
      // المستخدم مسح الاختيار أو القيمة فاضية
      this.dataSelectCity = null;
      this.districts = [];
      this.formProperty.get('City')?.patchValue(null);
      this.formProperty.get('District')?.patchValue(null);
      return;
    }
    this.dataSelectCity = data.name_ar;

    this.districts = this._SharedServices.allDistricts.filter(
      (dist: any) => dist.city_id === data.city_id
    );
    //console.log(this.districts);
    this.formProperty.get('City')?.patchValue(this.dataSelectCity);
  }

  OnSelecteddistricts(data: any) {
    // //console.log(data)
    this.dataSelectdistrict = data.name_ar;
    //console.log(this.dataSelectdistrict);
    this.formProperty.get('District')?.patchValue(this.dataSelectdistrict);
  }

  getAllNameOwner() {
    this._ownerServices
      .getAllDataOwner({})
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.nameOwners = res.rows;
      });
  }

  OnSelectedOwners(e: any) {
    this.dataSelectNameOwner = e.id;
    // //console.log(this.dataSelectNameOwner)
    this.formProperty.get('OwnerID')?.patchValue(this.dataSelectNameOwner);
  }

  onSubmit() {
    if (this.formProperty.valid) {
      if (this.btnAddandUpdate == 'add') {
        let formData = new FormData();

        formData.append('Name', this.formProperty.value.Name || '');
        formData.append(
          'PropertyNumber',
          this.formProperty.value.PropertyNumber || ''
        );
        formData.append('OwnerID', this.formProperty.value.OwnerID || '');
        formData.append('City', this.formProperty.value.City || '');
        formData.append('District', this.formProperty.value.District || '');
        formData.append('Street', this.formProperty.value.Street || '');
        formData.append(
          'BuildingNumber',
          this.formProperty.value.BuildingNumber || ''
        );
        formData.append('PostalCode', this.formProperty.value.PostalCode || '');
        formData.append(
          'Description',
          this.formProperty.value.Description || ''
        );
        // formData.append('Files',this.formProperty.value.Files || '');

        let files: File[] = this.formProperty.value.Files || [];

        files.forEach((file) => {
          formData.append('Files', file);
        });
        this._BuildingServices
          .createProperty(formData)
          .pipe(takeUntilDestroyed(this.$destroyRef))
          .subscribe((res: any) => {
            //  this.resetForm(
            //  //console.log(res);
            // this.formProperty.get('PropertyNumber')?.setValue(res.id);
            this.toastr.show('تم اضافه العقار بنجاح', 'success');
            this.getAllDataProperties();
            this.formProperty.reset();
            this.idRemoveFilesArray = [];
            this.dataFiles = [];
            this.attachmentsComp?.resetImages();
            // this.btnAddandUpdate='update';
            // this.idUpdate=res.id;
          });
      } else {
        // Update

        let data = new FormData();

        data.append('Id', this.idUpdate || '');
        data.append('Name', this.formProperty.value.Name || '');
        data.append(
          'PropertyNumber',
          this.formProperty.value.PropertyNumber || ''
        );
        data.append('OwnerID', this.formProperty.value.OwnerID || '');
        data.append('City', this.formProperty.value.City || '');
        data.append('District', this.formProperty.value.District || '');
        data.append('Street', this.formProperty.value.Street || '');
        data.append(
          'BuildingNumber',
          this.formProperty.value.BuildingNumber || ''
        );
        data.append('PostalCode', this.formProperty.value.PostalCode || '');
        data.append('Description', this.formProperty.value.Description || '');
        // data.append('Files',this.formProperty.value.Files || '');

        const files = this.formProperty.value.Files || [];

        files.forEach((file: any) => {
          data.append('NewFiles', file);
        });

        this.idRemoveFilesArray.forEach((id: any) => {
          data.append('RemovedAttachmentIds', id);
        });

        this._BuildingServices
          .updateData(data)
          .pipe(takeUntilDestroyed(this.$destroyRef))
          .subscribe((res: any) => {
            this.resetForm();
            this.toastr.show('تم تعديل العقار بنجاح', 'success');
            this.btnAddandUpdate = 'add';
            this.getAllDataProperties();
            // this.getAllDataProperties();
          });
      }
    } else {
      this.formProperty.markAllAsTouched();
    }
  }

  getDataFiles(e: any) {
    e.forEach((file: any) => {
      this.dataFiles.push(file.file);
    });

    this.formProperty.get('Files')?.setValue(this.dataFiles);
  }

  getAllDataProperties() {
    let pagination = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };
    this._BuildingServices
      .getAllDataBuilding(pagination)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.buildingsData = res;
      });
  }

  resetForm() {
    this.formProperty.reset();
    this.dataFiles = [];
    this.formProperty.get('Files')?.setValue([]);
    this.attachmentsComp?.resetImages(); // دالة جوه المكون تفضي الصور المعروضة
    this.btnAddandUpdate = 'add';
  }

  getUpdateData(id: any) {
    //console.log(id);
    this._BuildingServices
      .getDataUpdate(id)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.formProperty.patchValue({
          Name: res.name,
          PropertyNumber: res.id,
          OwnerID: res.ownerID,
          City: res.city,
          District: res.district,
          Street: res.street,
          BuildingNumber: res.buildingNumber,
          PostalCode: res.postalCode,
          Description: res.description,
          Files: res.attachments,
        });

        this.idUpdate = res.id;
        this.btnAddandUpdate = 'update';

        if (Array.isArray(res.attachments)) {
          this.dataFiles = res.attachments
            .filter((att: any) => att && att.filePath) // ← هنا الفلترة
            .map((att: any) => ({
              file: null,
              url: `${environment.apiUrl}${att.filePath}`,
              id: att.id,
            }))
            .filter((f: any) => f && f.url); // تأكد بعد التحويل برضو;

          if (this.attachmentsComp) {
            this.attachmentsComp.imgsArr = [...this.dataFiles];
            this.attachmentsComp.dataImgs.emit(this.dataFiles);
          }

          //console.log(this.dataFiles);
        } else {
          this.dataFiles = [];
        }
      });
  }

  RemoveFiles(ids: any) {
    //  e.log(this.idRemoveFilesArray)

    if (!Array.isArray(this.dataFiles)) return;

    this.dataFiles = this.dataFiles.filter(
      (data: any) => data && data.id && !ids.includes(data.id)
    );

    this.idRemoveFilesArray = ids;
  }

  onClose() {
    this.showDelete = false;
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;
    this._BuildingServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف العقار بنجاح', 'success');
        this.resetForm();
        this.getAllDataProperties();
        this.btnAddandUpdate = 'add';
        this.idRemoveFilesArray = [];
        this.dataFiles = [];
        this.attachmentsComp?.resetImages();
      });
  }

  showDeletePopup(id: any) {
    this.deleteId = id;
    this.showDelete = true;
  }

  searchData(val: any) {
    if (!val) {
      this.resetForm();
      return;
    }

    this.getUpdateData(val);
    val = '';
  }
}
