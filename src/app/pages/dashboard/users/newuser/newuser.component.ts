import { Component } from '@angular/core';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrl: './newuser.component.scss'
})
export class NewuserComponent {


users= [
  {
    "id": 1,
    "username": "ahmed123",
    "group": "admins",
    "email": "ahmed123@example.com",
    "phone": "01001234567",
    "status": "active",
    "actions": ["edit", "delete"]
  },
  {
    "id": 2,
    "username": "sara_dev",
    "group": "developers",
    "email": "sara_dev@example.com",
    "phone": "01007654321",
    "status": "inactive",
    "actions": ["edit", "activate"]
  },
  {
    "id": 3,
    "username": "mohamed77",
    "group": "users",
    "email": "mohamed77@example.com",
    "phone": "01009876543",
    "status": "active",
    "actions": ["edit", "delete"]
  },
  {
    "id": 4,
    "username": "noor_admin",
    "group": "management",
    "email": "noor_admin@example.com",
    "phone": "01005556667",
    "status": "active",
    "actions": ["edit", "suspend"]
  },
  {
    "id": 5,
    "username": "ali2025",
    "group": "users",
    "email": "ali2025@example.com",
    "phone": "01003334444",
    "status": "pending",
    "actions": ["edit", "activate"]
  },

  {
    "id": 4,
    "username": "noor_admin",
    "group": "management",
    "email": "noor_admin@example.com",
    "phone": "01005556667",
    "status": "active",
    "actions": ["edit", "suspend"]
  },
  {
    "id": 5,
    "username": "ali2025",
    "group": "users",
    "email": "ali2025@example.com",
    "phone": "01003334444",
    "status": "pending",
    "actions": ["edit", "activate"]
  },
  {
    "id": 4,
    "username": "noor_admin",
    "group": "management",
    "email": "noor_admin@example.com",
    "phone": "01005556667",
    "status": "active",
    "actions": ["edit", "suspend"]
  },
  {
    "id": 5,
    "username": "ali2025",
    "group": "users",
    "email": "ali2025@example.com",
    "phone": "01003334444",
    "status": "pending",
    "actions": ["edit", "activate"]
  }
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
