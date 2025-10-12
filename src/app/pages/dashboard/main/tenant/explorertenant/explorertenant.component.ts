import { Component } from '@angular/core';
import { Tenant } from '../models/tenant';

@Component({
  selector: 'app-explorertenant',
  templateUrl: './explorertenant.component.html',
  styleUrl: './explorertenant.component.scss'
})
export class ExplorertenantComponent {

  title='الرئيسيه'
  subtitle='المستأجر'
  showBtns=true
  AddTitle="مستكشف المستاجرين"

  dataFilter=['اسم المستأجر','رقم الهويه','رقم الجوال']

  tenantData:Tenant[] = [
  { name: 'محمد أحمد',   nationalId: '1012345678', phone: '0501234567', companions: 2 },
  { name: 'سعيد عبدالله', nationalId: '1018765432', phone: '0559876543', companions: 1 },
  { name: 'خالد عمر',     nationalId: '1013456789', phone: '0562223333', companions: 3 },
  { name: 'أحمد فهد',     nationalId: '1019876541', phone: '0574445555', companions: 0 },
  { name: 'ناصر علي',     nationalId: '1011122334', phone: '0586667777', companions: 4 },
  { name: 'ياسر حسن',     nationalId: '1015566778', phone: '0591112222', companions: 2 },
  { name: 'طارق يوسف',    nationalId: '1019988776', phone: '0509998888', companions: 1 },
  { name: 'محمود سامي',   nationalId: '1016655443', phone: '0517776666', companions: 5 },
  { name: 'عبدالله سعد',  nationalId: '1012233445', phone: '0523334444', companions: 0 },
  { name: 'خليل ابراهيم', nationalId: '1013344556', phone: '0535556666', companions: 3 },
  { name: 'محمد أحمد',   nationalId: '1012345678', phone: '0501234567', companions: 2 },
  { name: 'سعيد عبدالله', nationalId: '1018765432', phone: '0559876543', companions: 1 },
  { name: 'خالد عمر',     nationalId: '1013456789', phone: '0562223333', companions: 3 },
  { name: 'أحمد فهد',     nationalId: '1019876541', phone: '0574445555', companions: 0 },
  { name: 'ناصر علي',     nationalId: '1011122334', phone: '0586667777', companions: 4 },
  { name: 'ياسر حسن',     nationalId: '1015566778', phone: '0591112222', companions: 2 },
  { name: 'طارق يوسف',    nationalId: '1019988776', phone: '0509998888', companions: 1 },
  { name: 'محمود سامي',   nationalId: '1016655443', phone: '0517776666', companions: 5 },
  { name: 'عبدالله سعد',  nationalId: '1012233445', phone: '0523334444', companions: 0 },
  { name: 'خليل ابراهيم', nationalId: '1013344556', phone: '0535556666', companions: 3 }
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
