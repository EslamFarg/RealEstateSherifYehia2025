import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageformsService } from './services/messageforms.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';
import { Messageforms } from './models/messageforms';

@Component({
  selector: 'app-messageforms',
  templateUrl: './messageforms.component.html',
  styleUrl: './messageforms.component.scss',
})
export class MessageformsComponent implements OnInit {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb: FormBuilder = inject(FormBuilder);
  destroyRef: DestroyRef = inject(DestroyRef);
  _messageFormsServices: MessageformsService = inject(MessageformsService);
  toastr: ToastrService = inject(ToastrService);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!! Property

  messageForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required]],
    subject: ['رساله من برنامج العقارات'],
  });

  msgAllData: { items: Messageforms[]; total: any; page: any; pageSize: any } =
    {
      items: [],
      total: null,
      page: null,
      pageSize: null,
    };

  btnAddandUpdate = 'add';
  idUpdate: any;

  showDelete = false;
  deleteId: any;

  // pagination

  pageIndex = 1;
  pageSize = 10;
  totalPages = 0;

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  ngOnInit() {
    this.getAllDataMessageForms();
  }

  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllDataMessageForms();
  }

  onSubmit() {
    if (this.messageForm.valid) {
      if (this.btnAddandUpdate == 'add') {
        let data = {
          name: this.messageForm.value.name,
          body: this.messageForm.value.body,
          subject: this.messageForm.value.subject,
        };
        this._messageFormsServices
          .createMessage(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            // //console.log(res);
            this.toastr.show('تم ارسال الرسالة بنجاح', 'success');
            // this.messageForm.reset({
            //   subject: 'Hello Marco',
            // });

            // console.log(res);
            this.idUpdate=res.id;
            this.btnAddandUpdate='update'
            this.getAllDataMessageForms();
          });
      } else {
        // update

        let data = {
          id: this.idUpdate,
          name: this.messageForm.value.name,
          body: this.messageForm.value.body,
          subject: this.messageForm.value.subject,
        };
        this._messageFormsServices
          .updateData(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res: any) => {
            this.toastr.show('تم تعديل الرسالة بنجاح', 'success');
            // this.messageForm.reset({
            //   subject: 'Hello Marco',
            // });
            this.getAllDataMessageForms();
            this.btnAddandUpdate = 'update';
          });
      }
    } else {
      this.messageForm.markAllAsTouched();
    }
  }

  getAllDataMessageForms() {
    this._messageFormsServices
      .getAllDataMessageForms(this.pageIndex, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.msgAllData = res;
        this.totalPages = Math.ceil(this.msgAllData.total / this.pageSize);
      });
  }

  getUpdateData(id: any) {
    this._messageFormsServices
      .getDataUpdate(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.messageForm.patchValue({
          name: res.name,
          body: res.body,
          subject: res.subject,
        });

        this.idUpdate = id;
        this.btnAddandUpdate = 'update';
      });
  }

  showDeletePopup(id: any) {
    if (id) {
      this.showDelete = true;
      this.deleteId = id;
    }
  }

  deleteConfirmed(id: any) {
    this.showDelete = false;
    this._messageFormsServices
      .deleteData(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.toastr.show('تم حذف الرسالة بنجاح', 'success');
        this.getAllDataMessageForms();
        this.btnAddandUpdate = 'add';
        this.idUpdate = null;
        this.messageForm.reset();
      });
  }

  onClose() {
    this.showDelete = false;
  }
}
