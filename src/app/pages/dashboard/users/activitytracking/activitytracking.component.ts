import { Component } from '@angular/core';

@Component({
  selector: 'app-activitytracking',
  templateUrl: './activitytracking.component.html',
  styleUrl: './activitytracking.component.scss'
})
export class ActivitytrackingComponent {

  dataFilter=["اسم المستخدم","رقم السند",'التاريخ']



  activityTrackingData=[
  {
    "id": 1,
    "voucher_no": "VCH-1001",
    "date": "2025-01-01",
    "screen_name": "Invoices",
    "operation_type": "Create",
    "username": "ahmed123"
  },
  {
    "id": 2,
    "voucher_no": "VCH-1002",
    "date": "2025-01-02",
    "screen_name": "Payments",
    "operation_type": "Update",
    "username": "sara_dev"
  },
  {
    "id": 3,
    "voucher_no": "VCH-1003",
    "date": "2025-01-03",
    "screen_name": "Receipts",
    "operation_type": "Delete",
    "username": "mohamed77"
  },
  {
    "id": 4,
    "voucher_no": "VCH-1004",
    "date": "2025-01-04",
    "screen_name": "Users",
    "operation_type": "Login",
    "username": "noor_admin"
  },
  {
    "id": 5,
    "voucher_no": "VCH-1005",
    "date": "2025-01-05",
    "screen_name": "Reports",
    "operation_type": "View",
    "username": "ali2025"
  },
    {
    "id": 3,
    "voucher_no": "VCH-1003",
    "date": "2025-01-03",
    "screen_name": "Receipts",
    "operation_type": "Delete",
    "username": "mohamed77"
  },
  {
    "id": 4,
    "voucher_no": "VCH-1004",
    "date": "2025-01-04",
    "screen_name": "Users",
    "operation_type": "Login",
    "username": "noor_admin"
  },
  {
    "id": 5,
    "voucher_no": "VCH-1005",
    "date": "2025-01-05",
    "screen_name": "Reports",
    "operation_type": "View",
    "username": "ali2025"
  },
    {
    "id": 3,
    "voucher_no": "VCH-1003",
    "date": "2025-01-03",
    "screen_name": "Receipts",
    "operation_type": "Delete",
    "username": "mohamed77"
  },
  {
    "id": 4,
    "voucher_no": "VCH-1004",
    "date": "2025-01-04",
    "screen_name": "Users",
    "operation_type": "Login",
    "username": "noor_admin"
  },
  {
    "id": 5,
    "voucher_no": "VCH-1005",
    "date": "2025-01-05",
    "screen_name": "Reports",
    "operation_type": "View",
    "username": "ali2025"
  },
    {
    "id": 3,
    "voucher_no": "VCH-1003",
    "date": "2025-01-03",
    "screen_name": "Receipts",
    "operation_type": "Delete",
    "username": "mohamed77"
  },
  {
    "id": 4,
    "voucher_no": "VCH-1004",
    "date": "2025-01-04",
    "screen_name": "Users",
    "operation_type": "Login",
    "username": "noor_admin"
  },
  {
    "id": 5,
    "voucher_no": "VCH-1005",
    "date": "2025-01-05",
    "screen_name": "Reports",
    "operation_type": "View",
    "username": "ali2025"
  },  {
    "id": 3,
    "voucher_no": "VCH-1003",
    "date": "2025-01-03",
    "screen_name": "Receipts",
    "operation_type": "Delete",
    "username": "mohamed77"
  },
  {
    "id": 4,
    "voucher_no": "VCH-1004",
    "date": "2025-01-04",
    "screen_name": "Users",
    "operation_type": "Login",
    "username": "noor_admin"
  },
  {
    "id": 5,
    "voucher_no": "VCH-1005",
    "date": "2025-01-05",
    "screen_name": "Reports",
    "operation_type": "View",
    "username": "ali2025"
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
