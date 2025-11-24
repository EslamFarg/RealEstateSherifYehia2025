import { Component, DestroyRef, inject } from '@angular/core';
import { MaintenanceService } from '../services/maintenance.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RowMaintenace } from '../models/maintenance';
import { PaginationInfo } from '../../../main/apartment/models/apartment';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorermaintenance',
  templateUrl: './explorermaintenance.component.html',
  styleUrl: './explorermaintenance.component.scss',
})
export class ExplorermaintenanceComponent {
  dataFilter = ['رقم البلاغ', 'الوحده', 'العقار', 'الحاله'];

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services

  _maintenanceServices: MaintenanceService = inject(MaintenanceService);
  destroyRef: DestroyRef = inject(DestroyRef);
  _EditBehaviorSer: EditBehaviorServiceService = inject(
    EditBehaviorServiceService
  );
  router: Router = inject(Router);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111 Properties

  reportsAllData: { rows: RowMaintenace[]; paginationInfo: any } = {
    rows: [],
    paginationInfo: null,
  };

  showDelete: boolean = false;

  // pagination

  pageIndex = 1;
  pageSize = 10;
  deleteId: any;
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Method

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDataMaintenances();
  }

  ngOnInit() {
    this.getAllDataMaintenances();
  }

  getAllDataMaintenances() {
    let pagination = {
      paginationInfo: {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      },
    };

    // this..getAllDataMaintenance(pagination).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    // this.maintenancesData=res.rows;
    // })

    this._maintenanceServices
      .getAllDataMaintenaces(pagination)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        // //console.log(res);
        this.reportsAllData = res;
      });
  }

  onSelectedPagination(e: any) {
    // //console.log(e);
    this.pageSize = e;
    this.getAllDataMaintenances();
  }

  onSearchFilter(e: any) {
    // //console.log(e);

    let ShapeDataFilter = {
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
    };

    // if(e.index == 0){
    //   ShapeDataFilter.searchFilter.column=0;
    // }else if(e.index == 1){
    //   ShapeDataFilter.searchFilter.column=4;
    // }else if(e.index == 2){
    //   ShapeDataFilter.searchFilter.column=2;
    // }else{
    //   ShapeDataFilter.searchFilter.column=8;
    // }

    switch (e.index) {
      case 0:
        ShapeDataFilter.searchFilter.column = 0;
        break;
      case 1:
        ShapeDataFilter.searchFilter.column = 4;
        break;
      case 2:
        ShapeDataFilter.searchFilter.column = 2;
        break;
      default:
        ShapeDataFilter.searchFilter.column = 8;
        break;
    }

    if (!ShapeDataFilter.searchFilter.value) {
      this.getAllDataMaintenances();
      return;
    }

    this._maintenanceServices
      .searchData(ShapeDataFilter)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        if (res && res.rows && res.rows.length > 0) {
          this.reportsAllData = res;
        } else if (res && res.rows && res.rows.length === 0) {
          this.reportsAllData = { rows: [], paginationInfo: null };
        } else {
          this.reportsAllData = { rows: [], paginationInfo: null };
        }

        e.value = '';
      });
  }

  getUpdateData(id: any) {
    this.router.navigate(['/dashboard/maintenance/addmaintenance']);
    this._EditBehaviorSer.setId(id);
    // this._maintenanceServices.getUpdateData(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  }

  onClose() {
    this.showDelete = false;
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;
    this._maintenanceServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getAllDataMaintenances();
      });
  }

  ShowPopupdeleteData(id: any) {
    this.showDelete = true;
    this.deleteId = id;
  }
}
