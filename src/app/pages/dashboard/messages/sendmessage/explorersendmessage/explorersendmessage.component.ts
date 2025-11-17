import { Component, DestroyRef, inject } from '@angular/core';
import { SendmessageService } from '../services/sendmessage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorersendmessage',
  templateUrl: './explorersendmessage.component.html',
  styleUrl: './explorersendmessage.component.scss',
})
export class ExplorersendmessageComponent {
  dataFilter = ['الاسم', 'رقم التليفون'];
  _sendMessageServices: SendmessageService = inject(SendmessageService);
  destroyRef: DestroyRef = inject(DestroyRef);
  editBehaviorService: EditBehaviorServiceService = inject(
    EditBehaviorServiceService
  );
  router: Router = inject(Router);
  messagesData: any = { items: [], total: 0 };
  pageIndex = 1;
  pageSize = 10;
  totalPages = 0;

  getAllListGroupMessages() {
    this._sendMessageServices
      .getAllDataMessagesListgroup(this.pageIndex, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.messagesData = res;
        this.totalPages = Math.ceil(res.total / this.pageSize);
      });
  }

  ngOnInit() {
    this.getAllListGroupMessages();
  }
  onPageChanged(page: number) {
    this.pageIndex = page;
    this.getAllListGroupMessages();
  }

  //  getAllListGroupMessages() {
  //     this._sendMessageServices
  //       .getAllDataMessagesListgroup(this.pageIndex, this.pageSize)
  //       .pipe(takeUntilDestroyed(this.destroyRef))
  //       .subscribe((res: any) => {
  //         this.messagesData.items = res.items;
  //         this.messagesData.total = res.total;
  //         this.pageIndex = res.page;
  //         this.pageSize = res.pageSize;
  //       });
  //   }

  onSelectedPagination(data: any) {
    // this.pageIndex = data.pageIndex;
    this.pageSize = data;
    this.getAllListGroupMessages();
  }

  onSearchFilter(e: any) {
    this.pageIndex = 0;
    this.pageSize = 10;

    this._sendMessageServices
      .searchByTenant(e.value, this.pageIndex, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        this.messagesData = res;
        this.totalPages = Math.ceil(res.total / this.pageSize);
      });
  }

  sendGetDataById(id: any) {
    this.editBehaviorService.setId(id);
    this.router.navigate(['/dashboard/sendmessage/addsendmessage']);
  }
}
