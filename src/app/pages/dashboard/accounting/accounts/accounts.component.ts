import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { take } from 'rxjs';
import { Accounts } from './models/account';
import { checkUsername } from '../../../../shared/validations/checkUsername';
import { SharedService } from '../../../../shared/services/shared.service';
import { Bank } from './models/bank';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111 Services

  fb: FormBuilder = inject(FormBuilder);
  _accountServices: AccountService = inject(AccountService);
  _sharedServices: SharedService = inject(SharedService);
  destroyRef: DestroyRef = inject(DestroyRef);
  toastr: ToastrService = inject(ToastrService);

  showDelete = false;
  deleteId: any;

  accountParent: any = [];

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property

  accountData = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        checkUsername.ValidationUsername(),
        Validators.minLength(3),
      ],
    ],
    type: [null, [Validators.required]],
    accountNumber: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]{8,20}$/)],
    ],
    iban: [null, [Validators.pattern(/^[A-Z]{2}[0-9A-Z]{20,32}$/)]],
    parentId: [null, [Validators.required]],
  });
  btnAddandUpdate = 'add';
  idUpdate: any;

  financiallyAccountId: any;

  typeAccount: Bank[] = [];

  accountsAllData: { rows: Accounts[]; paginationInfo: any } = {
    rows: [],
    paginationInfo: null,
  };

  // pagination

  pageIndex = 1;
  pageSize = 10;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Methods

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllData();
    this.getAllFinicalData();
    this.getBanksJson();
  }
  getBanksJson() {
    this._sharedServices
      .getBanksJson()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.typeAccount = res;
      });
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.accountParent = res.rows;
      });
  }

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllData();
  }

  onSubmit() {
    if (this.accountData.valid) {
      if (this.btnAddandUpdate == 'add') {
        let data = {
          name: this.accountData.value.name,
          type: this.accountData.value.type,
          accountNumber: this.accountData.value.accountNumber,
          iban: this.accountData.value.iban,
          parentID: this.accountData.value.parentId,
        };

        this._accountServices
          .createData(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم اضافه الحساب بنجاح', 'success');
            this.accountData.reset();
            this.getAllData();
          });
      } else {
        // update
        let data = {
          id: this.idUpdate,
          name: this.accountData.value.name,
          type: this.accountData.value.type,
          accountNumber: this.accountData.value.accountNumber,
          iban: this.accountData.value.iban,
          parentID: this.accountData.value.parentId,
          financiallyAccountId: this.financiallyAccountId,
        };

        this._accountServices
          .updateData(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل الحساب بنجاح', 'success');
            this.accountData.reset();
            this.getAllData();
            this.btnAddandUpdate = 'add';
          });
      }
    } else {
      this.accountData.markAllAsTouched();
    }
  }

  getAllData() {
    let pagination = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };

    this._accountServices
      .getAllData(pagination)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.accountsAllData = res;
      });
  }

  getUpdateData(id: any) {
    this.idUpdate = id;

    this._accountServices
      .getDataUpdate(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.accountData.patchValue({
          name: res.name,
          type: res.type,
          accountNumber: res.accountNumber,
          iban: res.iban,
          parentId: res.parentId,
        });

        this.financiallyAccountId = res.financiallyAccountId;
        this.btnAddandUpdate = 'update';
      });
  }

  onClose() {
    this.showDelete = false;
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;
    this._accountServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف الحساب بنجاح', 'success');
        this.getAllData();
        this.accountData.reset();
        this.btnAddandUpdate = 'add';
        this.idUpdate = null;
      });
  }

  showDeletePopup(id: any) {
    this.deleteId = id;
    this.showDelete = true;
  }
}
