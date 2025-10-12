import { Component, inject } from '@angular/core';
import { Owner } from './models/owner';
import { ToastrService } from '../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss'
})
export class OwnerComponent {

  toastr:ToastrService=inject(ToastrService);

  // titlePage
  title='الرئيسيه'
  subtitle="المالك"


  // dataView
  ownersData: Owner[] = [
  { id: 1, ownerName: "أحمد محمد علي",    mobile: "01001234567", nationalId: "28506123401234" },
  { id: 2, ownerName: "منى سامي حسين",     mobile: "01009876543", nationalId: "29705234567890" },
  { id: 3, ownerName: "خالد إبراهيم حسن",  mobile: "01112345678", nationalId: "30101111222333" },
  { id: 4, ownerName: "سارة محمود عمر",    mobile: "01233445566", nationalId: "29807098765432" },
  { id: 5, ownerName: "محمود فؤاد عبد",    mobile: "01055667788", nationalId: "29009234567812" },
  { id: 6, ownerName: "نهى مصطفى فرج",     mobile: "01199887766", nationalId: "30304123456789" },
  { id: 7, ownerName: "ياسر سليمان جمال",   mobile: "01234566778", nationalId: "29903123400123" },
  { id: 8, ownerName: "هالة ربيع ناصر",     mobile: "01022334455", nationalId: "28612123456780" },
  { id: 9, ownerName: "عمر رامي سعيد",      mobile: "01166778899", nationalId: "30205123400987" },
  { id:10, ownerName: "ريم محمد خالد",      mobile: "01277889900", nationalId: "29508123456745" }
];

// pagination

pageIndex=1
pageSize=10


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}
}
