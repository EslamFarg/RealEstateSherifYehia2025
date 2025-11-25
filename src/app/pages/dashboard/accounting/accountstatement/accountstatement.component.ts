import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../accounts/services/account.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccountstatementService } from './services/accountstatement.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrl: './accountstatement.component.scss',
})
export class AccountstatementComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Services
  @ViewChild('accountElement') accountElement!: ElementRef;
  fb: FormBuilder = inject(FormBuilder);
  _accountsStatementSer: AccountstatementService = inject(
    AccountstatementService
  );
  destroyRef: DestroyRef = inject(DestroyRef);
  _sharedService: SharedService = inject(SharedService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property
  FromSearchData: any = this.fb.group({
    accountId: [null, [Validators.required]],
    fromDate: [
      this._sharedService.getPreviousYearDate(),
      [Validators.required],
    ],
    toDate: [this._sharedService.getTodayDate(), [Validators.required]],
  });

  accountStatement: any = [];
  accountData: any = [];
  summaryList: any;

  // pagination
  pageIndex = 1;
  pageSize = 10;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getAllAccounts();
    // this.searchOnData();
  }

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.searchOnData();
  }

  getAllAccounts() {
    let pagination = {
      paginationInfo: {
        pageIndex: 0,
        pageSize: 0,
      },
    };
    this._accountsStatementSer
      .getAllaccountsfinancially(pagination)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.accountData = res.rows;
      });
  }

  totalPages: any = 1;

  searchOnData() {
    if (this.FromSearchData.valid) {
      let ShapeDataFilter = {
        accountId: this.FromSearchData.value.accountId,
        fromDate: this.FromSearchData.value.fromDate,
        toDate: this.FromSearchData.value.toDate,
        criteriaDto: {
          paginationInfo: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          },
        },
      };

      this._accountsStatementSer
        .searchAccountsEstatement(ShapeDataFilter)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res: any) => {
          // this.accountData = res;
          const selectedAccount = this.accountData.find(
            (a: any) => a.id == this.FromSearchData.value.accountId
          );

          this.summaryList = res.summary;

          // summary
          // :
          // totalCredit
          // :
          // 2327.61
          // totalDebit
          // :
          // 0

          this.accountStatement = res.listAccounts.rows.map((item: any) => {
            return { ...item, name: selectedAccount.name };
          });

          this.totalPages = res.listAccounts.paginationInfo.totalPagesCount || 1;
        });
    } else {
      this.FromSearchData.markAllAsTouched();
    }
  }
}
