import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountCardService } from './services/account-card.service';
import { AccountCard } from './interfaces/account-card';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-accountcard',
  templateUrl: './accountcard.component.html',
  styleUrl: './accountcard.component.scss',
})
export class AccountcardComponent implements OnInit {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services
  fb = inject(FormBuilder);
  _accountCardService = inject(AccountCardService);
  toastr: ToastrService = inject(ToastrService);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Properties
  accountCardForm!: FormGroup;
  btnAddandUpdate = 'add';
  pageIndex = 1;
  pageSize = 10;
  total: number = 0;
  accountCardList: AccountCard[] = [];
  accountParentList: AccountCard[] = [];
  // !!!!!!!!!!!!!!!!!!!!!!!!! Methods
  ngOnInit(): void {
    this.initForm();
    this.getAccountParent();
    this.getFinancialAccounts();
  }
  initForm() {
    this.accountCardForm = this.fb.group({
      name: ['', [Validators.required]],
      accountNumber: [null],
      parentId: [null, [Validators.required]],
      notes: [''],
    });
  }
  getAccountParent() {
    const payload = {
      paginationInfo: {
        pageIndex: 0,
        pageSize: 0,
      },
    };
    this._accountCardService.getFinancialAccountList(payload).subscribe({
      next: (res: any) => {
        this.accountParentList = res.rows;
      },
    });
  }
  getFinancialAccounts() {
    const payload = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };
    this._accountCardService.getFinancialAccountList(payload).subscribe({
      next: (res: any) => {
        this.accountCardList = res.rows;
        this.total = res.paginationInfo.totalPagesCount;
      },
    });
  }
  onSubmit() {
    if (this.accountCardForm.invalid) {
      this.accountCardForm.markAllAsTouched();
      return;
    }
    if (this.btnAddandUpdate == 'update') {
      const payload = {
        updateFinancialAccountDto: {
          id: this.accountCardForm.value.accountNumber,
          name: this.accountCardForm.value.name,
          notes: this.accountCardForm.value.notes,
        },
      };
      this._accountCardService.updateFinancialAccount(payload).subscribe({
        next: (res) => {
          this.getFinancialAccounts();
          // this.btnAddandUpdate = 'add';
          this.toastr.show('تم تعديل الحساب بنجاح', 'success');
        },
      });
      return;
    } else {
      const payload = {
        createFinancialAccountDto: {
          name: this.accountCardForm.value.name,
          parentId: this.accountCardForm.value.parentId,
          notes: this.accountCardForm.value.notes,
        },
      };
      this._accountCardService.createFinancialAccount(payload).subscribe({
        next: (res) => {
          this.btnAddandUpdate = 'update';
          this.accountCardForm.patchValue({ accountNumber: res });
          this.getFinancialAccounts();
          this.toastr.show('تم اضافه الحساب بنجاح', 'success');
        },
      });
    }
  }
  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getFinancialAccounts();
    // this.fetchEmployees(); // أعد جلب البيانات
    // this.getData()
    // this.getAllDataPaymentVoucher1();
  }
  onEdit(id: number) {
    this._accountCardService.getFinancialAccountById(id).subscribe({
      next: (res: any) => {
        this.accountCardForm.patchValue({
          name: res.name,
          accountNumber: res.id,
          parentId: res.parentId,
          notes: res.notes,
        });
        this.btnAddandUpdate = 'update';
      },
    });
  }
}
