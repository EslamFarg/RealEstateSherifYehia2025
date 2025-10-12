import { Component } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {

  groupsData=[
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
    {
      id:1,
      name_group:'المجموعه'
    },
  ]

    // pagination

pageIndex=1
pageSize=10


onPageChanged(page: number) {
  this.pageIndex = page;
  // this.fetchEmployees(); // أعد جلب البيانات
  // this.getData()
}
}
