import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassificationapartmentService } from './services/classificationapartment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { Classificationapartment } from './models/classificationapartment';

@Component({
  selector: 'app-classificationapartment',
  templateUrl: './classificationapartment.component.html',
  styleUrl: './classificationapartment.component.scss',
})
export class ClassificationapartmentComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Services

  fb: FormBuilder = inject(FormBuilder);
  _unitCategoryServices: ClassificationapartmentService = inject(
    ClassificationapartmentService
  );
  $destroyRef: DestroyRef = inject(DestroyRef);
  toastr: ToastrService = inject(ToastrService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property
  // pagination

  pageIndex = 1;
  pageSize = 10;

  unitCategory = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  title = 'الرئيسيه';
  subtitle = 'تصنيف الوحده';

  unitCategoriesData: { rows: Classificationapartment[]; paginationInfo: any } =
    {
      rows: [],
      paginationInfo: null,
    };

  btnaddandupdate = 'add';
  idUpdate: any;

  showDelete = false;
  deleteId: any;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllDataUnitCategories();
  }

  onSubmit() {
    if (this.unitCategory.valid) {
      if (this.btnaddandupdate == 'add') {
        let data = {
          name: this.unitCategory.value.name,
        };

        this._unitCategoryServices
          .createUnitCategories(data)
          .pipe(takeUntilDestroyed(this.$destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم اضافة التصنيف بنجاح', 'success');
            this.unitCategory.reset();
            this.btnaddandupdate = 'add';
            this.getAllDataUnitCategories();
          });
      } else {
        // update
        let data = {
          id: this.idUpdate,
          name: this.unitCategory.value.name,
        };

        this._unitCategoryServices
          .updateData(data)
          .pipe(takeUntilDestroyed(this.$destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل التصنيف بنجاح', 'success');
            this.unitCategory.reset();
            this.btnaddandupdate = 'add';
            this.getAllDataUnitCategories();
          });
      }
    } else {
      this.unitCategory.markAllAsTouched();
    }
  }

  getAllDataUnitCategories() {
    let pagination = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };
    this._unitCategoryServices
      .getAllDataUnitCategories1(pagination)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.unitCategoriesData = res;
      });
  }
  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDataUnitCategories();
  }

  getUpdateData(id: any) {
    this._unitCategoryServices
      .getUpdateData(id)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.unitCategory.patchValue({ name: res.name });
        this.btnaddandupdate = 'update';
        this.idUpdate = res.id;

        // //console.log(this.idUpdate)
      });
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;
    this._unitCategoryServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف التصنيف بنجاح', 'success');
        this.getAllDataUnitCategories();
        this.unitCategory.reset();
        this.btnaddandupdate = 'add';
        this.idUpdate = null;
      });
  }

  showDeletePopup(id: any) {
    this.showDelete = true;
    this.deleteId = id;
  }

  onClose() {
    this.showDelete = false;
  }
}
