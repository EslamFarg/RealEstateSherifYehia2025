import { Component, DestroyRef, inject } from '@angular/core';
import { MaintenanceService } from '../maintenance/services/maintenance.service';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TypemaintenanceService } from './services/typemaintenance.service';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { Typemaintenance } from './models/typemaintenance';

@Component({
  selector: 'app-typemaintenance',
  templateUrl: './typemaintenance.component.html',
  styleUrl: './typemaintenance.component.scss',
})
export class TypemaintenanceComponent {
  // !!!!!!!!!!!!!!!!!1 Services

  _maintenanceService: TypemaintenanceService = inject(TypemaintenanceService);
  fb: FormBuilder = inject(FormBuilder);
  destroyRef: DestroyRef = inject(DestroyRef);
  toastr: ToastrService = inject(ToastrService);

  // !!!!!!!!!!!!!!!!!! Property

  maintenanceTypes: { rows: Typemaintenance[]; paginationInfo: any } = {
    rows: [],
    paginationInfo: null,
  };
  btnAddandUpdate = 'add';
  idUpdate: any;

  maintenanceData = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  showDelete = false;
  deleteId: any;

  // pagination

  pageIndex = 1;
  pageSize = 10;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!1111 methods
  ngOnInit() {
    this.getAllDatamaintenance();
  }
  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDatamaintenance();
  }

  onSubmit() {
    if (this.maintenanceData.valid) {
      if (this.btnAddandUpdate == 'add') {
        let data = {
          name: this.maintenanceData.value.name,
        };

        this._maintenanceService
          .createMaintenance(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم اضافة الصيانه بنجاح', 'success');
            this.maintenanceData.reset();
            this.getAllDatamaintenance();
            this.btnAddandUpdate = 'add';
          });
      } else {
        // update
        let data = {
          id: this.idUpdate,
          name: this.maintenanceData.value.name,
        };
        this._maintenanceService
          .updateData(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل الصيانه بنجاح', 'success');
            this.maintenanceData.reset();
            this.getAllDatamaintenance();
            this.btnAddandUpdate = 'add';
          });
      }
    } else {
      this.maintenanceData.markAllAsTouched();
    }
  }

  getAllDatamaintenance() {
    let pagination = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };
    this._maintenanceService
      .getAllDataMaintenance(pagination)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.maintenanceTypes = res;
      });
  }

  getDataUpdate(id: any) {
    this._maintenanceService
      .getDataUpdate(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.maintenanceData.patchValue(res);
        this.idUpdate = id;
        this.btnAddandUpdate = 'update';
      });
  }

  onClose() {
    this.showDelete = false;
  }

  deleteDataPopup(id: any) {
    this.showDelete = true;
    this.deleteId = id;
  }
  deleteConfirmed(id: any) {
    this.showDelete = false;
    this._maintenanceService
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف الصيانه بنجاح', 'success');
        this.getAllDatamaintenance();
        this.btnAddandUpdate = 'add';
        this.idUpdate = null;
        this.maintenanceData.reset();
      });
  }
}
