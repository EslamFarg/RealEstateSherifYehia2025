import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupService } from './services/group.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { Group } from './models/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent {
  // !!!!!!!!!!!!!!!!!!!!!!! Services

  fb: FormBuilder = inject(FormBuilder);
  _groupServices: GroupService = inject(GroupService);
  destroyRef: DestroyRef = inject(DestroyRef);
  toastr: ToastrService = inject(ToastrService);

  // !!!!!!!!!!!!!!!!!!!!!!!1 Property

  groupForm = this.fb.group({
    groupName: ['', [Validators.required, Validators.minLength(3)]],
    description: ['Hello Marco'],
  });

  btnaddAndUpdate = 'add';
  idUpdate: any;
  // pagination
  deleteId: any;

  pageIndex = 1;
  pageSize = 10;

  showDelete = false;

  groupsData: { rows: Group[]; paginationInfo: any } = {
    rows: [],
    paginationInfo: null,
  };

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!11 Methods

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllDataGroup();
  }

  onSubmit() {
    // debugger
    if (this.groupForm.valid) {
      if (this.btnaddAndUpdate == 'add') {
        let data = {
          groupName: this.groupForm.value.groupName,
          description: this.groupForm.value.description ?? 'Hello Marco',
        };
        this._groupServices
          .CreateGroup(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم اضافه المجموعه بنجاح', 'success');
            this.groupForm.reset();

            this.getAllDataGroup();
          });
        this.btnaddAndUpdate = 'add';
      } else {
        let data = {
          groupId: this.idUpdate,
          groupName: this.groupForm.value.groupName,
          description: this.groupForm.value.description ?? 'Hello Marco',
        };

        this._groupServices
          .updateData(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل المجموعه بنجاح', 'success');
            this.groupForm.reset();
            this.btnaddAndUpdate = 'add';
            this.getAllDataGroup();
          });
      }
    } else {
      this.groupForm.markAllAsTouched();
    }
  }

  getAllDataGroup() {
    this._groupServices
      .getAllDataGroup(`PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.groupsData = res;
      });
  }

  getDataUpdate(id: any) {
    if (id) {
      this._groupServices
        .getDataUpdate(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res: any) => {
          this.groupForm.patchValue({
            groupName: res.groupName,
            description: res.description,
          });
          console.log(res);

          this.idUpdate = res.id;
          this.btnaddAndUpdate = 'update';
        });
    }
  }
  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDataGroup();
  }

  deleteConfirmed(id: any) {
    this._groupServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف المجموعه بنجاح', 'success');
        this.getAllDataGroup();
        this.showDelete = false;
      });
  }

  deleteData(id: any) {
    this.showDelete = true;
    this.deleteId = id;
  }
  onClose() {
    this.showDelete = false;
  }
}
