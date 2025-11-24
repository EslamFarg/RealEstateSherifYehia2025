import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SalifsService } from '../services/salifs.service';
import { SalifsModal } from '../models/salifs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorersalifs',
  templateUrl: './explorersalifs.component.html',
  styleUrl: './explorersalifs.component.scss',
})
export class ExplorersalifsComponent implements OnInit {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

  _salifsServices: SalifsService = inject(SalifsService);
  _behaviorSer: EditBehaviorServiceService = inject(EditBehaviorServiceService);
  destroyRef: DestroyRef = inject(DestroyRef);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Property
  dataFilter = ['رقم السند', 'اسم الموظف'];

  salifsData: { rows: SalifsModal[]; paginationInfo: any } = {
    rows: [],
    paginationInfo: null,
  };

  // pagination

  pageIndex = 1;
  pageSize = 10;

  showDelete: any = false;
  deleteId: any;

  // !!!!!!!!!!!!!!!!!!!!!!!!! methods

  ngOnInit(): void {
    this.getAllDataPaymentVoucher();
  }
  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDataPaymentVoucher();
  }

  getAllDataPaymentVoucher() {
    let pagination = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };

    this._salifsServices
      .getAllData(pagination)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.salifsData = res;
        //console.log(this.salifsData);
      });
  }

  onSearchFilter(e: any) {
    // console

    let ShapeDataFilter = {
      searchRequest: {
        criteriaDto: {
          paginationInfo: {
            pageIndex: 0,
            pageSize: 0,
          },
        },
        searchFilter: {
          column: 0,
          value: e.value,
        },
      },
    };

    if (!ShapeDataFilter.searchRequest.searchFilter.value) {
      this.getAllDataPaymentVoucher();
      return;
    }

    switch (e.index) {
      case 0:
        ShapeDataFilter.searchRequest.searchFilter.column = 0;
        break;
      case 1:
        ShapeDataFilter.searchRequest.searchFilter.column = 15;
        break;
    }

    this._salifsServices
      .searchData(ShapeDataFilter)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.salifsData = res;
        //console.log(res);
      });
  }

  onSelectedPagination(e: any) {
    this.pageSize = e;
    this.getAllDataPaymentVoucher();
  }

  ShowDeletePopup(id: any) {
    this.deleteId = id;
    this.showDelete = true;
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;
    this._salifsServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف الصيانة بنجاح', 'success');
        this.getAllDataPaymentVoucher();
      });
  }

  onClose() {
    this.showDelete = false;
  }

  getEditData(id: any) {
    this.router.navigate(['/dashboard/salifis/addsalifs']);
    this._behaviorSer.setId(id);
  }
}
