import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { EmployeesService } from '../../employees/services/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SalaryDisbursementService } from '../services/salary-disbursement.service';
import { AccountService } from '../../../accounting/accounts/services/account.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { SharedService } from '../../../../../shared/services/shared.service';

@Component({
  selector: 'app-add-salary-disbursement',
  templateUrl: './add-salary-disbursement.component.html',
  styleUrl: './add-salary-disbursement.component.scss',
})
export class AddSalaryDisbursementComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  salaryDisbursementService: SalaryDisbursementService = inject(
    SalaryDisbursementService
  );
  accountsServices: AccountService = inject(AccountService);
  destroyRef: DestroyRef = inject(DestroyRef);
  fb: FormBuilder = inject(FormBuilder);
  toastr: ToastrService = inject(ToastrService);
  editBehaviorServiceService: EditBehaviorServiceService = inject(
    EditBehaviorServiceService
  );
  _sharedService: SharedService = inject(SharedService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  showEmployeePopup = false;
  getAllDateemployees: any[] = [];
  getAllDataAccounts: any[] = [];

  employeesSalary: any = [];
  showCanBtns = false;

  formExchange = this.fb.group({
    voucherNo: ['0'],
    bookNumber: ['', [Validators.required, Validators.minLength(3)]],
    month: [null, [Validators.required]],
    year: [new Date().getFullYear(), [Validators.required]],
    dateTime: [new Date().toISOString().split('T')[0], [Validators.required]],
    note: ['', Validators.required],
    lines: this.fb.array([], Validators.required),
  });

  // داله الوصول الي فورم اري
  get lines(): FormArray {
    return this.formExchange.get('lines') as FormArray;
  }

  FormLines = this.fb.group({
    employeeName: [''],
    accountId: ['', Validators.required],
    employeeId: [null, Validators.required],
    debitAccountId: ['', Validators.required],

    AccountName: [''],
    creditAccountId: [null, Validators.required],
    month: [null, Validators.required],
    // get current year
    year: [new Date().getFullYear(), Validators.required],
    salary: [0, Validators.required],
    rewards: [0, Validators.required],
    penalties: [0, Validators.required],
    loanRepayment: [0, Validators.required],

    absenceDays: [0, Validators.required],
    absenceDeduction: [0, Validators.required],
    netPay: [0, Validators.required],
  });

  //  lines: [
  //     {
  //       accountId: 0,
  //       employeeId: 0,
  //       debitAccountId: 0,
  //       creditAccountId: 0,
  //       month: 0,
  //       year: 0,
  //       salary: 0,
  //       rewards: 0,
  //       penalties: 0,
  //       loanRepayment: 0,
  //       absenceDays: 0,
  //       absenceDeduction: 0,
  //       netPay: 0
  //     }
  //   ]

  months = [
    { id: 1, name: 'يناير' },
    { id: 2, name: 'فبراير' },
    { id: 3, name: 'مارس' },
    { id: 4, name: 'أبريل' },
    { id: 5, name: 'مايو' },
    { id: 6, name: 'يونيو' },
    { id: 7, name: 'يوليو' },
    { id: 8, name: 'أغسطس' },
    { id: 9, name: 'سبتمبر' },
    { id: 10, name: 'أكتوبر' },
    { id: 11, name: 'نوفمبر' },
    { id: 12, name: 'ديسمبر' },
  ];

  btnAddandUpdate = 'add';
  idUpdateAndDelete: any;
  canShowAdd = true;
  getDataPrint:any

  //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  ngOnInit(): void {
    
    this.formExchange.get('dateTime')?.valueChanges.subscribe((res:any)=>{
      this.formExchange?.patchValue({
        year:res.split('-')[0]
      });
      this.FormLines?.patchValue({
        year:res.split('-')[0]
      })
    })
    this.getAllAccounts();
    // this.calculateNetPay();
    this.FormLines.get('absenceDays')?.valueChanges.subscribe((days) => {
      this.calculateNetPay();
    });

    this.FormLines.valueChanges.subscribe(() => {
      this.calculateNetPay();
    });

    this.formExchange
      .get('month')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((month: any) => {
        const year = this.formExchange.get('year')?.value || 2025;
        this.getEmployeesByMonth(month, year);
      });

    this.editBehaviorServiceService.idSubscribe
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id: any) => {
        if (id) {
          this.searchById({ value: id });
        }
      });
  }

  // getAllEmployees(){

  //   if(!this.formExchange.get('month')?.value || this.formExchange.get('month')?.value==null){
  //     return;
  //   }

  //   this.salaryDisbursementService.getEmployeespayrollVoucher(this.formExchange.get('month')?.value,2025).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{

  //     this.getAllDateemployees=res.rows;

  //   })

  // }

  getEmployeesByMonth(month: number, year: any) {
    if (!month || !year) return;

    this.salaryDisbursementService
      .getEmployeespayrollVoucher(month, year)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getAllDateemployees = res.rows;
        // مسح الاختيار الحالي إذا كان موجود
        this.FormLines.get('employeeId')?.reset();
      });
  }

  calculateNetPay() {
    this.FormLines.valueChanges.subscribe((values) => {
      const salary = Number(values.salary) || 0; // الراتب
      const rewards = Number(values.rewards) || 0; // المكافأه
      const penalties = Number(values.penalties) || 0; // الجزائ ات
      const loanRepayment = Number(values.loanRepayment) || 0; // تسديد السُلفة
      // const absenceDeduction = Number(values.absenceDeduction) || 0;
      const absenceDays = Number(values.absenceDays) || 0;

      const absenceDeduction = absenceDays; // ✅ اليوم = 20 ريال

      // const net = salary - absenceDeduction - loanRepayment - penalties + rewards;

      const netPay =
        salary + rewards - penalties - loanRepayment - absenceDeduction;

      this.FormLines.patchValue(
        {
          absenceDeduction: absenceDeduction,
          netPay: netPay,
        },
        { emitEvent: false }
      );
    });
  }

  getAllAccounts() {
    this.accountsServices
      .getAllData({})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getAllDataAccounts = res.rows;
      });
  }

  onSubmit() {
    if (this.formExchange.valid) {
      const payload = this.formExchange.getRawValue();

      if (this.btnAddandUpdate == 'add') {
        this.salaryDisbursementService
          .createPayrollVoucher(payload)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم انشاء البيانات بنجاح', 'success');
            this.btnAddandUpdate = 'add';
            this.formExchange.get('voucherNo')?.setValue(res);
            // this.employeesSalary = [];
            // this.formExchange.reset();
            this.idUpdateAndDelete = res;
            this.showCanBtns = true;
            this.canShowAdd = false;
          });
      } else {
        // TODO: Update
      }
    } else {
      this.formExchange.markAllAsTouched();
    }

    // Log payload INCLUDING disabled controls
    //console.log(this.formExchange.getRawValue());
  }

  addLine() {
    if (!this.FormLines.get('employeeId')?.valid) {
      this.toastr.show('يرجى تحديد الموظف', 'error');
      return;
    }

    if (!this.FormLines.get('creditAccountId')?.valid) {
      this.toastr.show('يرجى تحديد الحساب', 'error');
      return;
    }

    // 🔥 FIX: set month & year from main form
    this.FormLines.patchValue({
      month: this.formExchange.get('month')?.value,
      year: this.formExchange.get('year')?.value,
    });

    const lineData = {
      ...this.FormLines.value,
      month: Number(this.FormLines.value.month),
      year: Number(this.FormLines.value.year),
      salary: Number(this.FormLines.value.salary) || 0,
      rewards: Number(this.FormLines.value.rewards) || 0,
      penalties: Number(this.FormLines.value.penalties) || 0,
      loanRepayment: Number(this.FormLines.value.loanRepayment) || 0,
      absenceDays: Number(this.FormLines.value.absenceDays) || 0,
      absenceDeduction: Number(this.FormLines.value.absenceDeduction) || 0,
      netPay: Number(this.FormLines.value.netPay) || 0,
    };

    this.employeesSalary.push(lineData);
    this.lines.push(this.fb.group(lineData));

    // disable month after adding first line
    this.formExchange
      .get('month')
      ?.disable({ onlySelf: true, emitEvent: false });

    this.FormLines.reset();
  }

  deleteItem(i: any) {
    this.employeesSalary.splice(i, 1);

    if (this.employeesSalary.length == 0) {
      this.formExchange.get('month')?.enable();
    }
  }

  changeEmployees(e: any) {
    //console.log(e);
    if (!e) {
      return;
    }

    // this.FormLines.get('employeeId')?.patchValue(e.id);
    // this.FormLines.get('debitAccountId')?.patchValue(e.financiallyAccountId);
    // this.FormLines.get('salary').patchValue(e.salary);

    this.FormLines.patchValue({
      employeeName: e.name,
      employeeId: e.id,
      debitAccountId: e.financiallyAccountId,
      salary: e.salary,
      loanRepayment: e.totalSalaryAdvances,
      netPay: e.salary,
    });

    //console.log(this.FormLines.value);
  }

  changeAccount(e: any) {
    //console.log(e);
    if (!e) {
      return;
    }

    this.FormLines.patchValue({
      AccountName: e.name,
      accountId: e.id,
    });
  }

  // !!!!!!!!!!!! search

  getAllEmployee:any

  searchById(valSearchById: any) {
    const id = valSearchById.value;

    if (!id) {
      this.toastr.show('برجاء ادخال رقم السند', 'error');
      return;
    }

    this.salaryDisbursementService
      .getByIdPayrollVoucher(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        //console.log(res);
        this.formExchange.patchValue({
          ...res,
          dateTime: res.date.split('T')[0],
        });
        //console.log(res);
        this.employeesSalary = res.lines;
        this.btnAddandUpdate = 'add';
        this.idUpdateAndDelete = res.id;
        this.formExchange.get('voucherNo')?.patchValue(res.id);
        this.showCanBtns = true;
        this.canShowAdd = false;

        this.getDataPrint=res;

        this.getAllEmployee=res;
        //console.log('GGGGGGG', this.getDataPrint);
      });
  }

  @ViewChild('searchVoucherNumberInp') searchByIdInput!: ElementRef;

  showDelete = false;
  deleteId: any;

  deletePayrollVoucher() {
    this.showDelete = true;
    this.deleteId = this.idUpdateAndDelete;
  }

  onClose() {
    this.showDelete = false;
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;
    this.salaryDisbursementService
      .deletePayrollVoucher(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف البيانات بنجاح', 'success');
        this.resetForm();
        
      });
  }

  resetForm() {
    this.FormLines.reset({
      employeeName: '',
      accountId: '',
      employeeId: null,
      debitAccountId: '',
      AccountName: '',
      creditAccountId: null,
      month: null,
  
      salary: 0,
      rewards: 0,
      penalties: 0,
      loanRepayment: 0,
      absenceDays: 0,
      absenceDeduction: 0,
      netPay: 0,
    });

    while (this.lines.length) {
      this.lines.removeAt(0);
    }

    this.employeesSalary = [];

    this.formExchange.reset({
      voucherNo: '0',
      bookNumber: '',
      month: null,
     
      dateTime: '',
      note: '',
      lines: [],
    });

    this.btnAddandUpdate = 'add';
    this.idUpdateAndDelete = null;
    this.searchByIdInput.nativeElement.value = '';
    this.showCanBtns = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.editBehaviorServiceService.clearId) {
      this.editBehaviorServiceService.clearId();
    }
  }

  // !!!!!!!!!!!!!!!!! PrintDistrubute

  isvisiblePrint: boolean = false;
  isVisiblePrintFn() {
    this.isvisiblePrint = !this.isvisiblePrint;
  }
}
