import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../../shared/services/shared.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LinkgrouppagesService } from './services/linkgrouppages.service';
import { take } from 'rxjs';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-linkgrouppages',
  templateUrl: './linkgrouppages.component.html',
  styleUrl: './linkgrouppages.component.scss',
})
export class LinkgrouppagesComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb: FormBuilder = inject(FormBuilder);
  _sharedServices: SharedService = inject(SharedService);
  destroyRef: DestroyRef = inject(DestroyRef);
  _linkGrouppagesServices: LinkgrouppagesService = inject(
    LinkgrouppagesService
  );
  toastr: ToastrService = inject(ToastrService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Properties

  pageIndex = 1;
  pageSize = 10;

  btnaddAndUpdate = 'add';

  groupForm: any;

  pagePermissionsData: any = [];

  idUpdate: any;
  showDelete = false;

  deleteId: any;
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  ngOnInit(): void {
    this.getAllGroups();
    this.getAllPages();
    this.getAllData();
    this.groupForm = this.fb.group({
      groupId: [null, [Validators.required]],
      pageIds: [[], [Validators.required]],
    });
  }

  onSubmit() {
    if (this.groupForm.valid) {
      if (this.btnaddAndUpdate == 'add') {
        this._linkGrouppagesServices
          .addPageAndGroup(this.groupForm.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم حفظ البيانات بنجاح', 'success');
            this.groupForm.reset();
            this.getAllData();
          });
      } else {
        // Update

        this._linkGrouppagesServices
          .updatePageAndGroup(this.groupForm.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل البيانات بنجاح', 'success');
            this.groupForm.reset();
            this.getAllData();
            this.btnaddAndUpdate = 'add';
          });
      }
    } else {
      this.groupForm.markAllAsTouched();
    }
  }

  getDataUpdate(id: any) {
    console.log(id);

    this._linkGrouppagesServices
      .getDataById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        7;
        console.log(res);
        const pagesIds = res.pages.map((item: any) => item.pageId);
        this.groupForm.patchValue({
          groupId: res.groupId,
          pageIds: pagesIds,
        });
        this.idUpdate = res.id;
        this.btnaddAndUpdate = 'update';
      });
  }

  deleteData(id: any) {}

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllData();
  }

  getAllDataGroups: any;
  getAllGroups() {
    this._sharedServices
      .getAllGroups()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        console.log(res);

        this.getAllDataGroups = res.rows;
      });
  }

  getAllDataPages: any;

  getAllPages() {
    this._sharedServices
      .getAllPages(0, 0)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getAllDataPages = res.rows;
      });
  }

  getAllDataGroupPages: any;
  getAllData() {
    this._linkGrouppagesServices
      .getAllDatagroupPages(this.pageIndex, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.getAllDataGroupPages = res;

        console.log('res', this.getAllDataGroupPages);
      });
  }

  resetForm() {
    this.groupForm.reset();
    this.idUpdate = null;
    this.btnaddAndUpdate = 'add';
  }

  showPopupDelete(id: any) {
    this.showDelete = true;
    this.deleteId = id;
  }

  onClose() {
    this.showDelete = false;
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;

    this._linkGrouppagesServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف البيانات بنجاح', 'success');
        this.getAllData();
        this.resetForm();
      });
  }
}
