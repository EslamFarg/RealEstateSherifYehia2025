import { SharedService } from './../../../../shared/services/shared.service';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { checkUsername } from '../../../../shared/validations/checkUsername';
import { NewuserService } from './services/newuser.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { Newuser } from './models/newuser';
import { GroupmessageService } from '../../messages/groupmessage/services/groupmessage.service';
import { GroupService } from '../group/services/group.service';
import { CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.scss',
})
export class NewuserComponent {
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb: FormBuilder = inject(FormBuilder);
  _newUserServices: NewuserService = inject(NewuserService);
  destroyRef: DestroyRef = inject(DestroyRef);
  _toastrSer: ToastrService = inject(ToastrService);
  _sharedServices: SharedService = inject(SharedService);
  groupServices: GroupService = inject(GroupService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property

  getAllData: Newuser[] = [];
  btnAddAndUpdate = 'add';
  idUpdate: any;
  showDelete: any = false;
  deleteId: any;
  selectedCountry = CountryISO.Egypt;
  // pagination

  pageIndex = 1;
  pageSize = 10;
  totalPages = 0;
  formData = this.fb.group({
    userName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        checkUsername.ValidationUsername(),
      ],
    ],
    fullName: [''],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [null as any, Validators.required],
    // password: ['Sh12345678Sh'],
    // groupIds:[[],Validators.required],
    groupIds: this.fb.control<number[]>([]),
    isActive: [true, Validators.required],
  });

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Methods
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllDataUser();
    this.getAllGroup();
  }

  groupAllData: any = [];

  getFc(name: any) {
    return this.formData.get(name) as FormControl;
  }
  onSubmit() {
    let groupIds: any[] = [];

    if (this.formData.value.groupIds) {
      if (Array.isArray(this.formData.value.groupIds)) {
        groupIds = this.formData.value.groupIds.map((id: any) => Number(id));
      } else {
        // إذا كانت قيمة واحدة فقط (object أو string)
        groupIds = [Number(this.formData.value.groupIds)];
      }
    }

    if (this.formData.valid) {
      if (this.btnAddAndUpdate == 'add') {
        const groupIds = Array.isArray(this.formData.value.groupIds)
          ? this.formData.value.groupIds.map((id: any) => Number(id))
          : [Number(this.formData.value.groupIds)];
        const phoneControl = this.formData.value.phoneNumber as any;
        const mobile = phoneControl?.e164Number || phoneControl;

        let data = {
          userName: this.formData.value.userName,
          fullName: this.formData.value.userName,
          email: this.formData.value.email,
          phoneNumber: mobile,
          // password: this.formData.value.password,
          isActive: this.formData.value.isActive,
          groupIds: groupIds,
        };

        this._newUserServices
          .addNewUser(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this._toastrSer.show('تم اضافه المستخدم بنجاح', 'success');
            this.formData.reset();
            this.getAllDataUser();
          });

        this.btnAddAndUpdate = 'add';
      } else {
        const groupIds = Array.isArray(this.formData.value.groupIds)
          ? this.formData.value.groupIds.map((id: any) => Number(id))
          : [Number(this.formData.value.groupIds)];
        const phoneControl = this.formData.value.phoneNumber as any;
        const mobile = phoneControl?.e164Number || phoneControl;
        let data = {
          userId: this.idUpdate,
          userName: this.formData.value.userName,
          fullName: this.formData.value.userName,
          email: this.formData.value.email,
          phoneNumber: mobile,
          isActive: this.formData.value.isActive,
          groupIds: groupIds,
        };

        this._newUserServices
          .UpdateData(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this._toastrSer.show('تم تعديل المستخدم بنجاح', 'success');
            this.formData.reset();
            this.btnAddAndUpdate = 'add';
            this.getAllDataUser();
          });
      }
    } else {
      this.formData.markAllAsTouched();
    }
  }

  getAllDataUser() {
    this._newUserServices
      .getAllDataUser(this.pageIndex, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getAllData = res.items;
        this.totalPages = res.totalPages;
      });
  }

  getUpdateData(id: any) {
    this.btnAddAndUpdate = 'update';
    this._newUserServices
      .getDataUpdate(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.idUpdate = res.userId;
        const phone = this._sharedServices.parsePhoneNumber(res.phoneNumber);
        this.formData.patchValue({
          userName: res.userName,
          email: res.email,
          isActive: res.isActive,
        });
        this.selectedCountry = phone.countryCode;

        setTimeout(() => {
          this.formData.get('phoneNumber')?.setValue(phone);
        });
      });
  }

  deleteModel(id: any) {
    this.showDelete = true;
    this.deleteId = id;
  }

  onClose() {
    this.showDelete = false;
  }

  deleteConfirmed(e: any) {
    this.showDelete = false;

    this._newUserServices
      .deleteData(this.deleteId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this._toastrSer.show('تم حذف المستخدم بنجاح', 'success');
        this.getAllDataUser();
        this.btnAddAndUpdate = 'add';
        this.idUpdate = null;
        this.formData.reset();
      });
  }

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDataUser();
  }

  getAllDataGroupName = [];
  getAllGroup() {
    this.groupServices
      .getAllDataGroup({})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getAllDataGroupName = res.rows;
      });
  }
}
