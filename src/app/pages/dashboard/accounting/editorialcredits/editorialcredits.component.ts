import { Component, inject, OnInit } from '@angular/core';
import { EditorialCreditsService } from './services/editorial-credits.service';
import { EditorialCredits } from './interfaces/editorial-credits';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-editorialcredits',
  templateUrl: './editorialcredits.component.html',
  styleUrl: './editorialcredits.component.scss',
})
export class EditorialcreditsComponent implements OnInit {
  _editorialCreditsService: EditorialCreditsService = inject(
    EditorialCreditsService
  );
  fb = inject(FormBuilder);
  toastr: ToastrService = inject(ToastrService);
  _sharedServices: SharedService = inject(SharedService);
  editorialForm!: FormGroup;
  pageIndex = 1;
  pageSize = 10;
  total: number = 0;
  editotialCreditsList: EditorialCredits[] = [];
  dataFilter: any[] = [];
  selectedFilterControl = 'financialName';
  ngOnInit(): void {
    this.initForm();
    this.getEditorialCreditsList();
  }
  initForm() {
    this.editorialForm = this.fb.group({
      financialName: [null],
      accountId: [null],
      fromDate: [this._sharedServices.getPreviousYearDate()],
      toDate: [this._sharedServices.getTodayDate()],
    });
    this.dataFilter = [
      {
        id: this.editorialForm.controls['financialName'].value,
        name: 'اسم الحساب',
      },
      {
        id: this.editorialForm.controls['accountId'].value,
        name: 'رقم الحساب',
      },
    ];
  }
  getEditorialCreditsList() {
    const payload = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };
    return this._editorialCreditsService
      .getEditorialCreditsList(payload)
      .subscribe({
        next: (res: any) => {
          this.editotialCreditsList = res.rows;
          this.total = res.paginationInfo.totalPagesCount;
        },
      });
  }
  
  getEditorialCreditsListFilter() {
    const payload: any = {
      criteria: {
        paginationInfo: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      },
    };

    Object.keys(this.editorialForm.value).forEach((key) => {
      const value = this.editorialForm.value[key];
      if (value) payload[key] = value;
    });

    this._editorialCreditsService.filterEditorialCredits(payload).subscribe({
      next: (res: any) => {
        this.editotialCreditsList = res.rows;
        this.total = res.paginationInfo.totalPagesCount;
      },
    });
  }

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getEditorialCreditsListFilter();
  }

  applyFilter() {
    this.pageIndex = 1; // reset to first page when filtering
    this.getEditorialCreditsListFilter();
  }

  selectFilterData(e: any) {
    if (e.index === 0) {
      // Selected اسم الحساب
      this.selectedFilterControl = 'financialName';
      this.editorialForm.patchValue({
        financialName: e.value,
        accountId: null, // clear the other
      });
    } else if (e.index === 1) {
      // Selected رقم الحساب
      this.selectedFilterControl = 'accountId';
      this.editorialForm.patchValue({
        accountId: e.value,
        financialName: null, // clear the other
      });
    }

    this.getEditorialCreditsListFilter();
  }

  updateAll() {
    const payload = this.editotialCreditsList.map((item) => ({
      id: item.id,
      accountId: item.accountId,
      openingDate: item.openingDate,
      openingDebit: Number(item.openingDebit) || 0,
      openingCredit: Number(item.openingCredit) || 0,
      notes: item.notes ?? '',
    }));

    this._editorialCreditsService.updateEditorialCredits(payload).subscribe({
      next: () => {
        this.getEditorialCreditsList();
        this.toastr.show('تم التحديث بنجاح', 'success');
      },
    });
  }
}
