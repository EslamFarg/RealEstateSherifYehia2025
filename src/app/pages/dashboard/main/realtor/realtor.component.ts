import { Component, DestroyRef, inject } from '@angular/core';
import { Realtor } from './models/realtor';
import { nationality } from '../tenant/models/tenant';
import { SharedService } from '../../../../shared/services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { saudiPhoneValidator } from '../../../../shared/validations/phoneNumber';
import { RealtorService } from './services/realtor.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { CheckEmail } from '../../../../shared/validations/emailValidation';
import { checkUsername } from '../../../../shared/validations/checkUsername';
import { CountryISO } from 'ngx-intl-tel-input';
import { PhoneNumber } from '../owner/models/phoneNumber';
import { ksaEgyptPhoneValidator } from '../../../../shared/validations/phoneNumber2';

@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrl: './realtor.component.scss',
})
export class RealtorComponent {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  shared_service: SharedService = inject(SharedService);
  fb: FormBuilder = inject(FormBuilder);
  _BrokerServices: RealtorService = inject(RealtorService);
  $destroyRef: DestroyRef = inject(DestroyRef);
  toastr: ToastrService = inject(ToastrService);
  _sharedServices: SharedService = inject(SharedService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! property !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  BrokerData = this.fb.group({
    Name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        checkUsername.ValidationUsername(),
      ],
    ],
    Mobile: this.fb.control<PhoneNumber | string | null>(null, {
      validators: [Validators.required, ksaEgyptPhoneValidator],
    }),
    Nationality: [null, [Validators.required]],
    Bonus: ['', [Validators.required]],
    NationalID: ['', [Validators.required, Validators.minLength(10)]],
    Email: ['', [CheckEmail.ValidationEmail()]],
    parentId: [null, [Validators.required]],
    FinanciallyAccountId: [null],
    Files: [null],
  });

  dataNationality: nationality[] = [];
  accountParent: any = [];

  dataFiles: any[] = [];
  idRemoveFiles: any = [];
  showDelete = false;
  deleteId: any;
  preferredCountries: CountryISO[] = [CountryISO.Egypt];
  selectedCountry = CountryISO.Egypt;
  // :DestroyRef=inject(DestroyRef);

  pageIndex = 1;
  pageSize = 10;

  title = 'الرئيسيه';
  subtitle = 'السمسار';

  realtorData: { rows: Realtor[]; paginationInfo: any } = {
    rows: [],
    paginationInfo: null,
  };

  idUpdate: any;
  btnAddandUpdate = 'add';

  //
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! methods !!!!!!!!!!!!!!!!!!!!!!!!1

  ngOnInit() {
    this.getAllNationality();
    this.getAllDataRealtor();
    this.getAllFinicalData();
  }

  getAllNationality() {
    this.shared_service.getAllNationality().subscribe((res: any) => {
      this.dataNationality = res.nationalities.map((item: any) => ({
        code: item.code,
        nationality_ar: item.nationality_ar,
      }));
    });
  }

  onSubmit() {
    if (this.BrokerData.valid) {
      if (this.btnAddandUpdate == 'add') {
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

        let formData = new FormData();

        const mobileControl = this.BrokerData.value.Mobile;
        const mobile =
          typeof mobileControl === 'string'
            ? mobileControl
            : mobileControl?.e164Number || '';
        formData.append('Name', this.BrokerData.value.Name || '');
        formData.append('Mobile', mobile || '');
        formData.append('Nationality', this.BrokerData.value.Nationality || '');
        formData.append('Bonus', this.BrokerData.value.Bonus || '');
        formData.append('NationalID', this.BrokerData.value.NationalID || '');
        formData.append('Email', this.BrokerData.value.Email || '');
        formData.append('parentId', this.BrokerData.value.parentId || '');
        formData.append(
          'FinanciallyAccountId',
          this.BrokerData.value.FinanciallyAccountId || ''
        );

        const files: File[] = this.BrokerData.value.Files || [];

        files.forEach((file) => {
          formData.append('Files', file);
        });

        this._BrokerServices
          .createRelator(formData)
          .pipe(takeUntilDestroyed(this.$destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم اضافه السمسار بنجاح', 'success');
            this.BrokerData.reset();
            this.btnAddandUpdate = 'add';
            this.dataFiles = [];
            this.idRemoveFiles = [];
            this.getAllDataRealtor();
          });
      } else {
        if (!this.idUpdate) {
          this.toastr.show(
            'حدث خطأ: لم يتم تحديد السمسار المراد تعديله',
            'error'
          );
          return;
        }

        let formdata = new FormData();
        const mobileControl = this.BrokerData.value.Mobile;
        const mobile =
          typeof mobileControl === 'string'
            ? mobileControl
            : mobileControl?.e164Number || '';

        formdata.append('Name', this.BrokerData.value.Name || '');
        formdata.append('Mobile', mobile || '');
        formdata.append('Nationality', this.BrokerData.value.Nationality || '');
        formdata.append('Bonus', this.BrokerData.value.Bonus || '');
        formdata.append('NationalID', this.BrokerData.value.NationalID || '');
        formdata.append('Email', this.BrokerData.value.Email || '');
        formdata.append('parentId', this.BrokerData.value.parentId || '');
        formdata.append(
          'FinanciallyAccountId',
          this.BrokerData.value.FinanciallyAccountId || ''
        );
        formdata.append('Id', this.idUpdate || '');

        this.idRemoveFiles.forEach((id: any) => {
          formdata.append('RemovedAttachmentIds', id);
        });

        const files: File[] = this.BrokerData.value.Files || [];

        files.forEach((file) => {
          formdata.append('NewFiles', file);
        });

        // console

        this._BrokerServices
          .updateData(formdata)
          .pipe(takeUntilDestroyed(this.$destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل السمسار بنجاح', 'success');
            this.BrokerData.reset();
            this.btnAddandUpdate = 'add';
            this.dataFiles = [];
            this.getAllDataRealtor();
          });
      }
    } else {
      this.BrokerData.markAllAsTouched();
    }
  }

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDataRealtor();
  }

  OnDataFiles(ValueDataFiles: any) {
    this.BrokerData.get('Files')?.setValue(ValueDataFiles);
  }

  getAllDataRealtor() {
    let pagination = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };
    this._BrokerServices
      .getAllDataRealtor(pagination)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.realtorData = res;
      });
  }

  getUpdateData(id: any) {
    this._BrokerServices
      .getDataUpdate(id)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        const phone = this._sharedServices.parsePhoneNumber(res.mobile);
        this.BrokerData.patchValue({
          Name: res.name,
          Nationality: res.nationality,
          Bonus: res.bonus,
          NationalID: res.nationalID,
          Email: res.email,
          parentId: res.parentId,

          FinanciallyAccountId: res.financiallyAccountId,
        });
        this.selectedCountry = phone.countryCode;

        setTimeout(() => {
          this.BrokerData.get('Mobile')?.setValue(phone);
        });
        this.dataFiles = res.attachments;
        this.idUpdate = id ?? res.id ?? res.Id;

        this.btnAddandUpdate = 'update';
      });
  }

  fnIdRemoveFiles(id: any) {
    this.dataFiles = this.dataFiles.filter((el: any) => el.id != id);
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

  showDeletePopup(id: any) {
    this.showDelete = true;
    this.deleteId = id;
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;
    this._BrokerServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف السمسار بنجاح', 'success');
        this.getAllDataRealtor();
        this.resetData();
        this.BrokerData.reset();
        this.btnAddandUpdate = 'add';
      });
  }

  onClose() {
    this.showDelete = false;
  }

  getAllFinicalData() {
    let pagination = {
      paginationInfo: {
        pageIndex: 0,
        pageSize: 0,
      },
    };

    this._sharedServices
      .getAllfinancialData(pagination)
      .pipe(takeUntilDestroyed(this.$destroyRef))
      .subscribe((res: any) => {
        console.log(res);
        this.accountParent = res.rows;
      });
  }

  resetData() {
    this.dataFiles = [];
    this.btnAddandUpdate = 'add';
  }
}
