import { Component, DestroyRef, inject } from '@angular/core';
import { SharedService } from '../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from './services/employees.service';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { EmployeesModule } from './employees.module';
import { Employees } from './models/employees';
import { saudiPhoneValidator } from '../../../../shared/validations/phoneNumber';
import { CheckEmail } from '../../../../shared/validations/emailValidation';
import { CountryISO } from 'ngx-intl-tel-input';
import { ksaEgyptPhoneValidator } from '../../../../shared/validations/phoneNumber2';
import { PhoneNumber } from '../../main/owner/models/phoneNumber';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
  _sharedServices: SharedService = inject(SharedService);
  destroyRef: DestroyRef = inject(DestroyRef);
  fb: FormBuilder = inject(FormBuilder);

  _employeesServices: EmployeesService = inject(EmployeesService);
  toastr: ToastrService = inject(ToastrService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

  dataNationality: any[] = [];
  employeesData = this.fb.group({
    Name: ['', [Validators.required, Validators.minLength(2)]],
    Nationality: [null, [Validators.required]],
    Mobile: this.fb.control<PhoneNumber | string | null>(null, {
      validators: [Validators.required, ksaEgyptPhoneValidator],
    }),
    Email: ['', [CheckEmail.ValidationEmail()]],
    Address: ['', [Validators.required, Validators.minLength(3)]],
    NationalID: ['', [Validators.required, Validators.minLength(10)]],
    Salary: ['', [Validators.required]],
    Files: [null],
  });
  dataFiles: any = [];
  idUpdate: any;
  idsRemoveFiles: any = [];
  empData: { rows: Employees[]; paginationInfo: any } = {
    rows: [],
    paginationInfo: null,
  };

  // pagination
  btnAddandUpdate = 'add';

  pageIndex = 1;
  pageSize = 10;
  showDelete = false;
  deleteId: any;
  selectedCountry = CountryISO.Egypt;

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods !!!!!!!!!!!!!!!!!!!!!!!!!!!1
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllNationality();
    this.getAllData();
  }
  getAllNationality() {
    this._sharedServices
      .getAllNationality()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.dataNationality = res.nationalities.map((item: any) => ({
          code: item.code,
          nationality_ar: item.nationality_ar,
        }));
      });
  }

  onSubmit() {
    if (this.employeesData.valid) {
      if (this.btnAddandUpdate == 'add') {
        let formData = new FormData();
        const mobileControl = this.employeesData.value.Mobile;
        const mobile =
          typeof mobileControl === 'string'
            ? mobileControl
            : mobileControl?.e164Number || '';
        formData.append('Name', this.employeesData.value.Name ?? '');
        formData.append(
          'Nationality',
          this.employeesData.value.Nationality ?? ''
        );
        formData.append('Mobile', mobile ?? '');
        formData.append('Email', this.employeesData.value.Email ?? '');
        formData.append(
          'NationalID',
          this.employeesData.value.NationalID ?? ''
        );
        formData.append('Address', this.employeesData.value.Address ?? '');
        formData.append('Salary', this.employeesData.value.Salary ?? '');
        // formData.append('Salary',this.employeesData.value.Salary ?? '');

        let files = this.employeesData.value.Files || [];

        files.forEach((file: any) => {
          formData.append('Files', file);
        });
        this._employeesServices
          .createData(formData)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم اضافه البيانات بنجاح', 'success');
            this.employeesData.reset();
            this.employeesData.get('Files')?.patchValue(null);
            this.dataFiles = [];
            this.getAllData();
          });
      } else {
        // Update
        const mobileControl = this.employeesData.value.Mobile;
        const mobile =
          typeof mobileControl === 'string'
            ? mobileControl
            : mobileControl?.e164Number || '';
        let formData = new FormData();
        formData.append('Name', this.employeesData.value.Name ?? '');
        formData.append(
          'Nationality',
          this.employeesData.value.Nationality ?? ''
        );
        formData.append('Mobile', mobile ?? '');
        formData.append('Email', this.employeesData.value.Email ?? '');
        formData.append(
          'NationalID',
          this.employeesData.value.NationalID ?? ''
        );
        formData.append('Address', this.employeesData.value.Address ?? '');
        formData.append('Salary', this.employeesData.value.Salary ?? '');
        formData.append('id', this.idUpdate ?? '');

        // RemovedAttachmentIds

        this.idsRemoveFiles.forEach((id: any) => {
          formData.append('RemovedAttachmentIds', id);
        });

        let files: any = this.employeesData.value.Files || [];

        files
          .filter((el: any) => el instanceof File)
          .forEach((file: any) => {
            formData.append('NewFiles', file);
          });

        this._employeesServices
          .updateData(formData)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل البيانات بنجاح', 'success');
            this.employeesData.reset();
            this.employeesData.get('Files')?.patchValue(null);
            this.dataFiles = [];
            this.btnAddandUpdate = 'add';
          });
      }
    } else {
      this.employeesData.markAllAsTouched();
    }
  }

  OnDataFiles(file: any) {
    this.employeesData.get('Files')?.setValue(file);
  }

  fnIdRemoveFiles(ids: any) {
    // console.log(ids);
    // this.dataFiles=this.dataFiles.filter((el:any)=>!ids.includes(el.id));
    this.dataFiles = this.dataFiles.filter((el: any) => el.id !== ids);

    this.idsRemoveFiles.push(ids);
  }

  getAllData() {
    let pagination = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };
    this._employeesServices
      .getAllDataEmployees(pagination)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.empData = res;
        console.log(this.empData);
      });
  }

  getDataUpdate(id: any) {
    this._employeesServices
      .getUpdateDate(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        const phone = this._sharedServices.parsePhoneNumber(res.mobile);
        this.idUpdate = id;
        this.employeesData.patchValue({
          Name: res.name,
          Nationality: res.nationality,
          Email: res.email,
          Address: res.address,
          NationalID: res.nationalID,
          Salary: res.salary,
        });
        this.selectedCountry = phone.countryCode;
        setTimeout(() => {
          this.employeesData.get('Mobile')?.setValue(phone);
        });
        this.dataFiles = res.attachments;
        this.btnAddandUpdate = 'update';
      });
  }

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllData();
  }

  onClose() {
    this.showDelete = false;
  }
  getDataDelete(id: any) {
    this.showDelete = true;
    this.deleteId = id;
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;

    this._employeesServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        console.log(res);
        this.toastr.show('تم حذف البيانات بنجاح', 'success');
        this.getAllData();
      });
  }
}
