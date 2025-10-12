import { Component } from '@angular/core';

@Component({
  selector: 'app-typemaintenance',
  templateUrl: './typemaintenance.component.html',
  styleUrl: './typemaintenance.component.scss'
})
export class TypemaintenanceComponent {
maintenanceTypes: any[] = [
  "كهرباء",
  "سباكة",
  "نجارة",
  "دهان",
  "مكيفات",
  "مصاعد",
  "بلاط",
  "حدادة",
  "تنظيف",
  "شبكات",
  "أمن وسلامة",
  "تشجير وحدائق",
  "إضاءة",
  "أسطح وعزل",
  "أبواب ونوافذ"
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
