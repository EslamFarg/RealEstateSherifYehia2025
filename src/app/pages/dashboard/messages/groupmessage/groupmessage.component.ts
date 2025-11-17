import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupmessageService } from './services/groupmessage.service';
import { MessageformsService } from '../messageforms/services/messageforms.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'app-groupmessage',
  templateUrl: './groupmessage.component.html',
  styleUrl: './groupmessage.component.scss',
})
export class GroupmessageComponent implements OnInit {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Services
  toastr: ToastrService = inject(ToastrService);
  fb: FormBuilder = inject(FormBuilder);
  // groupMessageService:GroupmessageService=inject(MessageformsService)
  _groupMessageService: GroupmessageService = inject(GroupmessageService);
  destroyRef: DestroyRef = inject(DestroyRef);
  _sharedService: SharedService = inject(SharedService);
  pageIndex = 1;
  pageSize = 10;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Propertys
  dataFilter = [
    {
      id: 0,
      name: 'اسم الراسل',
    },
    {
      id: 1,
      name: 'رقم التليفون',
    },
  ];

  DataTypeFilter: any = 'string';
  SearchValue: any;

  SearchForm = this.fb.group({
    FromDate: [this._sharedService.getPreviousYearDate()],
    ToDate: [this._sharedService.getTodayDate()],
    // Search:['']
  });

  messagesData: any = [];

  // pagination

  // pageIndex=1
  // pageSize=10

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods
  // messagesData: any[] = [];
  // totalItems: number = 0;

  // selectFilterData(e:any){

  //   console.log(e);
  //   if(e.value == undefined || e.value == '') {
  //     // this.toastr.show('الرجاء املاء قيمه البحث','error');
  //     return;
  //   }

  //   if(e.index == 0){
  //     console.log('اسم الراسل')
  //     this.DataTypeFilter=e.dataType;
  //    this.SearchValue=e.value

  //   }else if(e.index == 1){

  //    console.log('رقم التليفون')
  //    this.DataTypeFilter=e.dataType;
  //    this.SearchValue=e.value

  //   }

  // }
  ngOnInit(): void {
    this.onSubmit();
  }
  selectFilterData(e: any) {
    if (!e || !e.value) {
      this.SearchValue = '';
      return;
    }

    this.DataTypeFilter = e.dataType;
    this.SearchValue = e.value;
  }

  totalItems: number = 0; // عدد العناصر الكلي

  onSubmit() {
    if (this.SearchForm.valid) {
      const paramsData = new URLSearchParams();
      paramsData.append('IsActive', 'true');
      paramsData.append('Page', this.pageIndex.toString());
      paramsData.append('PageSize', this.pageSize.toString());

      if (this.SearchValue) {
        paramsData.append('Search', this.SearchValue);
      }

      const fromDate = this.SearchForm.value.FromDate;
      const toDate = this.SearchForm.value.ToDate;

      if (fromDate && toDate) {
        paramsData.append('IncludeDates', 'true');
        const from = new Date(fromDate).toLocaleDateString('en-CA'); // يعطي '2025-11-11'
        const to = new Date(toDate).toLocaleDateString('en-CA');
        paramsData.append('FromDate', from);
        paramsData.append('ToDate', to);
        // paramsData.append('FromDate', new Date(fromDate).toString());
        // paramsData.append('ToDate', new Date(toDate).toString());
      }

      this._groupMessageService
        .searchMessage(paramsData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res: any) => {
          console.log(res);
          this.messagesData = res.items; // البيانات الفعلية
          this.totalItems = Math.ceil(res.total / this.pageSize); // إجمالي العناصر للpagination
          // this.pageIndex = res.page;        // الصفحة الحالية
          // this.pageSize = res.pageSize;     // حجم الصفحة
        });
    } else {
      this.SearchForm.markAllAsTouched();
    }
  }

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.onSubmit();
  }
}
