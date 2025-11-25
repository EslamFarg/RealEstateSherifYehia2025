import {
  Component,
  DestroyRef,
  inject,
  viewChild,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApartmentService } from '../services/apartment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { ClassificationapartmentService } from '../../classificationapartment/services/classificationapartment.service';
import { BuildingService } from '../../building/services/building.service';
import { environment } from '../../../../../../environments/environment';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { checkUsername } from '../../../../../shared/validations/checkUsername';

@Component({
  selector: 'app-addapartment',
  templateUrl: './addapartment.component.html',
  styleUrl: './addapartment.component.scss',
})
export class AddapartmentComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services

  fb: FormBuilder = inject(FormBuilder);
  _apartmentServices: ApartmentService = inject(ApartmentService);
  destroyRef: DestroyRef = inject(DestroyRef);
  toastr: ToastrService = inject(ToastrService);
  _classificationServices: ClassificationapartmentService = inject(
    ClassificationapartmentService
  );
  _propertyServices: BuildingService = inject(BuildingService);
  _behaviorServices: EditBehaviorServiceService = inject(
    EditBehaviorServiceService
  );

  // !!!!!!!!!!!!!!!!!!!!!!!!!!! Property
  unitData = this.fb.group({
    Name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        checkUsername.ValidationUsername(),
      ],
    ],
    RoomsCount: ['', [Validators.required]],
    UnitType: [null, [Validators.required]],
    Area: ['', [Validators.minLength(2)]],
    FloorNumber: [null, [Validators.required]],
    Price: ['', [Validators.required, Validators.minLength(4)]],
    Description: [''],
    PropertyID: [null, [Validators.required]],
    UnitCategoryId: [null, [Validators.required]],
    Files: [null],
  });

  title = 'الرئيسيه';
  subtitle = 'الوحده';
  // dataFiles:any[]=[]
  dataFiles: any | null[] = [];
  idRemoveFilesArray: [] = [];
  @ViewChild('attachments', { static: false }) attachmentsComp: any;
  @ViewChild('unitNumber') unitNumber: any;
  @ViewChild('valSearch') valSearch: any;
  btnaddandupdate = 'add';
  showDelete = false;
  deleteId: any;
  canDelete = false;
  RoomsCount = [
    {
      id: 1,
      name: '1',
    },
    {
      id: 2,
      name: '2',
    },
    {
      id: 3,
      name: '3',
    },
    {
      id: 4,
      name: '4',
    },
    {
      id: 5,
      name: '5',
    },
    {
      id: 6,
      name: '6',
    },
    {
      id: 7,
      name: '7',
    },
    {
      id: 8,
      name: '8',
    },
    {
      id: 9,
      name: '9',
    },
    {
      id: 10,
      name: '10',
    },
  ];

  getUnitCategories: any[] = [];

  getProperties: any[] = [];

  ngOnInit(): void {
    this.unitCategoryData();
    this.getAllDataProperty();
    this._behaviorServices.idSubscribe
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id) => {
        if (id) {
          this._apartmentServices
            .getDataUpdate(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res: any) => {
              this.unitData.patchValue({
                Name: res.name,
                RoomsCount: res.roomsCount,
                UnitType: res.unitType,
                Area: res.area,
                FloorNumber: res.floorNumber,
                Price: res.price,
                Description: res.description,
                PropertyID: res.propertyID,
                UnitCategoryId: res.unitCategoryId,
                Files: res.attachments,
              });
              res.attachments.forEach((file: any) => {
                this.dataFiles.push({
                  id: file.id,
                  url: `${environment.apiUrl}${file.filePath}`,
                  file: null,
                });
              });

              this.unitData.get('Files')?.setValue(this.dataFiles);
              this.attachmentsComp.imgsArr = this.dataFiles;
              this.unitNumber.nativeElement.value = res.id;
              this.btnaddandupdate = 'update';
              this.canDelete = true;
            });
        }
      });
  }

  refreshPage() {
    location.reload();
  }

  getFc(name: string) {
    return this.unitData.get(name) as FormControl;
  }

  onSubmit() {
    if (this.unitData.valid) {
      if (this.btnaddandupdate == 'add') {
        let formData = new FormData();

        formData.append('Name', this.unitData.value.Name || '');
        formData.append('RoomsCount', this.unitData.value.RoomsCount || '');
        formData.append('UnitType', this.unitData.value.UnitType || '');
        formData.append('Area', this.unitData.value.Area || '');
        formData.append('FloorNumber', this.unitData.value.FloorNumber || '');
        formData.append('Price', this.unitData.value.Price || '');
        formData.append('Description', this.unitData.value.Description || '');
        formData.append('PropertyID', this.unitData.value.PropertyID || '');
        formData.append(
          'UnitCategoryId',
          this.unitData.value.UnitCategoryId || ''
        );

        // let Files = this.unitData.value.Files || [];

        // Files.forEach((file) => {
        //   formData.append('Files', file);
        // });
        // use this.dataFiles which you maintain as the real array
                const filesToSend = this.dataFiles || [];
        
                filesToSend.forEach((f: any) => {
                  if (f && f.file) {
                    // ensure the value is treated as a File (which has a name); fallback to a default filename if missing
                    const fileObj = f.file as File;
                    const filename = (fileObj && fileObj.name) || 'file';
                    formData.append('Files', fileObj, filename);
                  }
                });

        this._apartmentServices
          .createApartment(formData)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.unitData.reset();
            this.toastr.show('تم اضافه الوحده بنجاح', 'success');
            //  this.resetForm();
            this.unitData.patchValue({
              Name: res.name,
              RoomsCount: res.roomsCount,
              UnitType: res.unitType,
              Area: res.area,
              FloorNumber: res.floorNumber,
              Price: res.price,
              Description: res.description,
              PropertyID: res.propertyID,
              UnitCategoryId: res.unitCategoryId,
            });

            res.attachments.forEach((file: any) => {
              this.dataFiles.push({
                id: file.id,
                url: `${environment.apiUrl}${file.filePath}`,
                file: null,
              });
            });

            this.unitData.get('Files')?.setValue(this.dataFiles);
            this.attachmentsComp.imgsArr = this.dataFiles;
            this.unitNumber.nativeElement.value = res.id;
            this.btnaddandupdate = 'update';
            this.canDelete = true;
          });
      } else {
        // update
        var formData = new FormData();
        formData.append('Id', this.unitNumber.nativeElement.value || '');
        formData.append('Name', this.unitData.value.Name || '');
        formData.append('RoomsCount', this.unitData.value.RoomsCount || '');
        formData.append('UnitType', this.unitData.value.UnitType || '');
        formData.append('Area', this.unitData.value.Area || '');
        formData.append('FloorNumber', this.unitData.value.FloorNumber || '');
        formData.append('Price', this.unitData.value.Price || '');
        formData.append(
          'Description',
          this.unitData.value.Description || 'hello marcos'
        );
        formData.append('PropertyID', this.unitData.value.PropertyID || '');
        formData.append(
          'UnitCategoryId',
          this.unitData.value.UnitCategoryId || ''
        );

        this.dataFiles.forEach((img: any) => {
          if (img.file) {
            formData.append('NewFiles', img.file);
          }
        });

        this.idRemoveFilesArray.forEach((id: any) => {
          formData.append('RemovedAttachmentIds', id);
        });

        this._apartmentServices
          .updateData(formData)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل الوحده بنجاح', 'success');
            // this.resetForm();
            // this.unitNumber.nativeElement.value = '0';
            // this.valSearch.nativeElement.value = '';
            // this.
            this.btnaddandupdate = 'update';
          });
      }
    } else {
      this.unitData.markAllAsTouched();
    }
  }

  getDataFiles(e: any) {
    this.dataFiles = e.map((item: any) => ({
      id: null,
      file: item.file,
      url: item.url || URL.createObjectURL(item.file),
    }));

    this.unitData.get('Files')?.setValue(this.dataFiles);
    this.attachmentsComp.imgsArr = this.dataFiles; // لو الكومبوننت بيعرض الصور
  }

  //   RemoveFiles(ids:any){

  // if (!Array.isArray(this.dataFiles)) return;

  //   this.dataFiles = this.dataFiles.filter(
  //     (data: any) => data && data.id && !ids.includes(data.id)
  //   );

  //  this.idRemoveFilesArray=ids;
  //    this.unitData.get('Files')?.setValue(this.dataFiles);
  //   }

  RemoveFiles(ids: any) {
    if (!Array.isArray(this.dataFiles)) return;

    // شيل الصور القديمة اللي id بتاعها من ضمن اللي اتحذف
    this.dataFiles = this.dataFiles.filter(
      (data: any) => !data.id || !ids.includes(data.id)
    );

    this.idRemoveFilesArray = ids;
    this.unitData.get('Files')?.setValue(this.dataFiles);
  }

  searchData(value: any) {
    if (value == '') {
      this.toastr.show('رجاء ادخال البحث', 'error');
      this.unitData.reset();
      this.resetForm();
      return;
    }
    let data = {
      criteriaDto: {
        paginationInfo: {
          pageIndex: 0,
          pageSize: 0,
        },
      },
      searchFilter: {
        column: 0,
        value: value,
      },
    };

    this._apartmentServices
      .searchDataUnitNumber(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        if (!res || !res.rows || res.rows.length === 0) {
          this.toastr.show('لم يتم العثور على وحدة بهذا الرقم', 'error');
          this.unitData.reset();
          this.resetForm();
          this.unitNumber.nativeElement.value = '0';
          this.valSearch.nativeElement.value = '';
          this.btnaddandupdate = 'add';
          this.canDelete = false;

          return;
        }
        this.toastr.show('تم البحث بنجاح', 'success');
        this.unitNumber.nativeElement.value = res.rows[0].id;
        this.unitData.patchValue({
          Name: res.rows[0].name,
          RoomsCount: res.rows[0].roomsCount,
          UnitType: res.rows[0].unitType,
          Area: res.rows[0].area,
          FloorNumber: res.rows[0].floorNumber,
          Price: res.rows[0].price,
          Description: res.rows[0].description,
          PropertyID: res.rows[0].propertyID,
          UnitCategoryId: res.rows[0].unitCategoryId,
        });

        res.rows[0].attachments.forEach((file: any) => {
          this.dataFiles.push({
            id: file.id,
            url: `${environment.apiUrl}${file.filePath}`,
            file: null,
          });
          this.unitData.get('Files')?.setValue(this.dataFiles);
          this.attachmentsComp.imgsArr = this.dataFiles;
        });

        this.canDelete = true;
        this.btnaddandupdate = 'update';
        // })
      });
  }

  deleteData() {
    if (
      this.unitNumber.nativeElement.value != '0' ||
      this.unitNumber.nativeElement.value != null ||
      this.unitNumber.nativeElement.value != undefined ||
      this.unitNumber.nativeElement.value != ''
    ) {
      this.deleteId = this.unitNumber.nativeElement.value;
      this.showDelete = true;
    }
  }

  onClose() {
    this.showDelete = false;
  }

  deleteConfirmed(e: any) {
    this.showDelete = false;
    this._apartmentServices
      .deleteData(e)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف الوحدة بنجاح', 'success');
        // this.getAllDataProperties();
        this.resetForm();
        this.deleteId = '';
        this.unitNumber.nativeElement.value = '0';
        this.valSearch.nativeElement.value = '';
        this.unitData.reset();
        this.canDelete = false;
      });
  }

  unitCategoryData() {
    // let pagination={
    //   paginationInfo: {
    //     pageIndex: 1,
    //     pageSize: 100
    //   }
    // }
    this._classificationServices
      .getAllDataUnitCategories1({})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getUnitCategories = res.rows;
        // //console.log(this.getUnitCategories)
      });
  }

  getAllDataProperty() {
    this._propertyServices
      .getAllDataBuilding({})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        //console.log(res);
        this.getProperties = res.rows;
      });
  }

  resetForm() {
    this.unitData.reset();
    this.dataFiles = [];
    this.idRemoveFilesArray = [];
    this.unitData.get('Files')?.setValue(null);
    this.attachmentsComp?.resetImages();
    this.btnaddandupdate = 'add';
    this.canDelete = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._behaviorServices.clearId();
  }
}
