import { Component } from '@angular/core';

@Component({
  selector: 'app-accountcard',
  templateUrl: './accountcard.component.html',
  styleUrl: './accountcard.component.scss'
})
export class AccountcardComponent {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Properties

btnAddandUpdate='add';

pageIndex=1
pageSize=10




// !!!!!!!!!!!!!!!!!!!!!!!!! Methods



onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
  // this.getAllDataPaymentVoucher1();
}




}
