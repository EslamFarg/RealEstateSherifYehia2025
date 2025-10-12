import { Component } from '@angular/core';

@Component({
  selector: 'app-explorermaintenance',
  templateUrl: './explorermaintenance.component.html',
  styleUrl: './explorermaintenance.component.scss'
})
export class ExplorermaintenanceComponent {

  dataFilter=["الوحده"]


   reports = [
  {
    id: 1,
    reportNumber: "BL-1001",
    date: "2025-09-01",
    unit: "الوحده 1",
    building: "العقار 1",
    maintenanceType: "كهرباء",
    employee: "أحمد علي",
    status: "مفتوح",
    tools: "سلم، مفك"
  },
  {
    id: 2,
    reportNumber: "BL-1002",
    date: "2025-09-02",
    unit: "الوحده 2",
    building: "العقار 1",
    maintenanceType: "مياه",
    employee: "محمد حسن",
    status: "مغلق",
    tools: "مفتاح انجليزي"
  },
  {
    id: 3,
    reportNumber: "BL-1003",
    date: "2025-09-03",
    unit: "الوحده 3",
    building: "العقار 2",
    maintenanceType: "دهان",
    employee: "محمود إبراهيم",
    status: "مفتوح",
    tools: "دهانات"
  },
  {
    id: 4,
    reportNumber: "BL-1004",
    date: "2025-09-04",
    unit: "الوحده 4",
    building: "العقار 2",
    maintenanceType: "سباكة",
    employee: "علي سمير",
    status: "قيد التنفيذ",
    tools: "مواسير"
  },
  {
    id: 5,
    reportNumber: "BL-1005",
    date: "2025-09-05",
    unit: "الوحده 5",
    building: "العقار 3",
    maintenanceType: "نجارة",
    employee: "حسام فؤاد",
    status: "مفتوح",
    tools: "منشار"
  },
  {
    id: 6,
    reportNumber: "BL-1006",
    date: "2025-09-06",
    unit: "الوحده 6",
    building: "العقار 3",
    maintenanceType: "كهرباء",
    employee: "سعيد أحمد",
    status: "مغلق",
    tools: "أسلاك"
  },
  {
    id: 7,
    reportNumber: "BL-1007",
    date: "2025-09-07",
    unit: "الوحده 7",
    building: "العقار 4",
    maintenanceType: "مياه",
    employee: "خالد محمود",
    status: "مفتوح",
    tools: "مفتاح أنابيب"
  },
  {
    id: 8,
    reportNumber: "BL-1008",
    date: "2025-09-08",
    unit: "الوحده 8",
    building: "العقار 4",
    maintenanceType: "دهان",
    employee: "يوسف علي",
    status: "قيد التنفيذ",
    tools: "بويات"
  },
  {
    id: 9,
    reportNumber: "BL-1009",
    date: "2025-09-09",
    unit: "الوحده 9",
    building: "العقار 5",
    maintenanceType: "سباكة",
    employee: "مروان طارق",
    status: "مفتوح",
    tools: "شاكوش"
  },
  {
    id: 10,
    reportNumber: "BL-1010",
    date: "2025-09-10",
    unit: "الوحده 10",
    building: "العقار 5",
    maintenanceType: "نجارة",
    employee: "أدهم محمود",
    status: "مغلق",
    tools: "خشب"
  },
  {
    id: 11,
    reportNumber: "BL-1011",
    date: "2025-09-11",
    unit: "الوحده 11",
    building: "العقار 6",
    maintenanceType: "كهرباء",
    employee: "إبراهيم سامي",
    status: "قيد التنفيذ",
    tools: "لمبات"
  },
  {
    id: 12,
    reportNumber: "BL-1012",
    date: "2025-09-12",
    unit: "الوحده 12",
    building: "العقار 6",
    maintenanceType: "مياه",
    employee: "عمرو فؤاد",
    status: "مفتوح",
    tools: "حنفية"
  },
  {
    id: 13,
    reportNumber: "BL-1013",
    date: "2025-09-13",
    unit: "الوحده 13",
    building: "العقار 7",
    maintenanceType: "دهان",
    employee: "طارق حسن",
    status: "مغلق",
    tools: "فرش دهان"
  },
  {
    id: 14,
    reportNumber: "BL-1014",
    date: "2025-09-14",
    unit: "الوحده 14",
    building: "العقار 7",
    maintenanceType: "سباكة",
    employee: "محمود جمال",
    status: "مفتوح",
    tools: "مواسير"
  },
  {
    id: 15,
    reportNumber: "BL-1015",
    date: "2025-09-15",
    unit: "الوحده 15",
    building: "العقار 8",
    maintenanceType: "نجارة",
    employee: "خليل حسن",
    status: "قيد التنفيذ",
    tools: "مطرقة"
  },
  {
    id: 16,
    reportNumber: "BL-1016",
    date: "2025-09-16",
    unit: "الوحده 16",
    building: "العقار 8",
    maintenanceType: "كهرباء",
    employee: "زياد عادل",
    status: "مفتوح",
    tools: "كابلات"
  },
  {
    id: 17,
    reportNumber: "BL-1017",
    date: "2025-09-17",
    unit: "الوحده 17",
    building: "العقار 9",
    maintenanceType: "مياه",
    employee: "حازم سعيد",
    status: "مغلق",
    tools: "أنابيب"
  },
  {
    id: 18,
    reportNumber: "BL-1018",
    date: "2025-09-18",
    unit: "الوحده 18",
    building: "العقار 9",
    maintenanceType: "دهان",
    employee: "نور الدين أحمد",
    status: "مفتوح",
    tools: "ألوان"
  },
  {
    id: 19,
    reportNumber: "BL-1019",
    date: "2025-09-19",
    unit: "الوحده 19",
    building: "العقار 10",
    maintenanceType: "سباكة",
    employee: "رامي حسن",
    status: "قيد التنفيذ",
    tools: "مفك"
  },
  {
    id: 20,
    reportNumber: "BL-1020",
    date: "2025-09-20",
    unit: "الوحده 20",
    building: "العقار 10",
    maintenanceType: "نجارة",
    employee: "وليد عبد الله",
    status: "مفتوح",
    tools: "خشب ومسامير"
  }
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
