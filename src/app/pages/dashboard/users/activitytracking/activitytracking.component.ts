import { Component, DestroyRef, inject } from '@angular/core';
import { ActivitytrackingService } from './services/activitytracking.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-activitytracking',
  templateUrl: './activitytracking.component.html',
  styleUrl: './activitytracking.component.scss',
})
export class ActivitytrackingComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services
  activityTrackingService: ActivitytrackingService = inject(
    ActivitytrackingService
  );
  toastr: ToastrService = inject(ToastrService);
  destroyRef: DestroyRef = inject(DestroyRef);
  fb: FormBuilder = inject(FormBuilder);
  _sharedService: SharedService = inject(SharedService);
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property

  formData = this.fb.group({
    userId: [''],
    startDate: [
      this._sharedService.getPreviousYearDate(),
      [Validators.required],
    ],
    endDate: [this._sharedService.getTodayDate(), [Validators.required]],
  });

  showErrorUserID = false;

  dataFilter = [
    {
      name: 'اسم المستخدم',
      id: 1,
    },
    {
      id: 2,
      name: 'رقم التليفون',
    },
  ];

  activityTrackingData: any = [];

  // pagination

  pageIndex = 1;
  pageSize = 10;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  userId = '';
  onPageChanged(page: number) {
    this.pageIndex = page;
    this.onSubmit();
  }

  searchUserId(e: any) {
    console.log(e);
    if (!e) {
      return;
    }

    let valueSearch = e.value;

    if (e.index == 1) {
      if (/[a-zA-Z\u0600-\u06FF]/.test(e.value)) {
        this.toastr.show('رقم الجوال يجب أن يحتوي على أرقام فقط', 'error');
        e.value = e.value.replace(/[a-zA-Z\u0600-\u06FF]/g, '');
        return;
      }
    } else if (e.index == 0) {
      if (!/[a-zA-Z\u0600-\u06FF]/.test(e.value)) {
        this.toastr.show(
          'اسم المستخدم يجب أن يحتوي على حروف فقط او حروف وارقام',
          'error'
        );
        e.value = e.value.replace(/[a-zA-Z\u0600-\u06FF]/g, '');
        return;
      }
    }
    this.activityTrackingService
      .searchUser(valueSearch)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        // this.usersData=res
        this.toastr.show('تم البحث بنجاح', 'success');
        this.formData.get('userId')?.setValue(this.userId);
        e.value = '';
      });
  }

  onSubmit() {
    const userIdVal = this.formData.get('userId')?.value;
    if (userIdVal == '' || userIdVal == null || userIdVal == undefined) {
      this.toastr.show('الرجاء البحث عن مستخدم', 'error');
      return;
    }

    if (this.formData.valid) {
      let data = {
        criteria: {
          paginationInfo: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          },
        },
        userId: this.formData.get('userId')?.value,
        startDate: this.formData.get('startDate')?.value,
        endDate: this.formData.get('endDate')?.value,
      };

      this.activityTrackingService
        .logs(data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res: any) => {
          // this.logsData=res
          this.activityTrackingData = res;
          console.log();
        });
    } else {
      this.formData.markAllAsTouched();
      this.showErrorUserID = true;
    }
  }

  dataSelectedUser(e: any) {
    console.log(e);
    // this.formData.patchValue({
    //   userId: e
    // })

    this.userId = e;
  }
}
