import { Component } from '@angular/core';

@Component({
  selector: 'app-explorerapartment',
  templateUrl: './explorerapartment.component.html',
  styleUrl: './explorerapartment.component.scss'
})
export class ExplorerapartmentComponent {

  title='الرئيسيه'
  subtitle="الوحده"


  dataFilter=['اسم الوحده','العماره']


  // !!!!!!!!!!!!!!!!!!!!!! Property



  units:any = [
  { id: 1, name: "وحدة 101", building: "عمارة النور", floor: 1, rooms: 3, price: 2500 },
  { id: 2, name: "وحدة 202", building: "عمارة الندى", floor: 2, rooms: 2, price: 2000 },
  { id: 3, name: "وحدة 303", building: "برج الخليج", floor: 3, rooms: 4, price: 3500 },
  { id: 4, name: "وحدة 404", building: "عمارة الورود", floor: 4, rooms: 3, price: 2800 },
  { id: 5, name: "وحدة 505", building: "برج السلام", floor: 5, rooms: 5, price: 4500 },
  { id: 1, name: "وحدة 101", building: "عمارة النور", floor: 1, rooms: 3, price: 2500 },
  { id: 2, name: "وحدة 202", building: "عمارة الندى", floor: 2, rooms: 2, price: 2000 },
  { id: 3, name: "وحدة 303", building: "برج الخليج", floor: 3, rooms: 4, price: 3500 },
  { id: 4, name: "وحدة 404", building: "عمارة الورود", floor: 4, rooms: 3, price: 2800 },
  { id: 5, name: "وحدة 505", building: "برج السلام", floor: 5, rooms: 5, price: 4500 },
  { id: 1, name: "وحدة 101", building: "عمارة النور", floor: 1, rooms: 3, price: 2500 },
  { id: 2, name: "وحدة 202", building: "عمارة الندى", floor: 2, rooms: 2, price: 2000 },
  { id: 3, name: "وحدة 303", building: "برج الخليج", floor: 3, rooms: 4, price: 3500 },
  { id: 4, name: "وحدة 404", building: "عمارة الورود", floor: 4, rooms: 3, price: 2800 },
  { id: 5, name: "وحدة 505", building: "برج السلام", floor: 5, rooms: 5, price: 4500 },

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
