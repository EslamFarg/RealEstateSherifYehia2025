import { Component } from '@angular/core';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrl: './building.component.scss'
})
export class BuildingComponent {

  title='الرئيسيه'
  subtitle="العقار"

  buildingsData: any = [
  { id: 1, name: "برج النور", owner: "أحمد علي", city: "الرياض" },
  { id: 2, name: "عمارة الندى", owner: "منى حسن", city: "جدة" },
  { id: 3, name: "فيلا السلام", owner: "سارة محمد", city: "الدمام" },
  { id: 4, name: "برج الخليج", owner: "خالد إبراهيم", city: "مكة" },
  { id: 5, name: "شقق الورود", owner: "محمود ربيع", city: "المدينة" }
];


// Property






  refreshPage(){
    location.reload();
  }

  // pagination

pageIndex=1
pageSize=10


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}


}
