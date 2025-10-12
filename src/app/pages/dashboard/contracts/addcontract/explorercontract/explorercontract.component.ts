import { Component } from '@angular/core';

@Component({
  selector: 'app-explorercontract',
  templateUrl: './explorercontract.component.html',
  styleUrl: './explorercontract.component.scss'
})
export class ExplorercontractComponent {

  dataFilter=['رقم العقد','اسم المستأجر','تاريخ ابرام العقد']


  getAllData= [
  {
    id: 1,
    contractNumber: "CN-2025-001",
    tenantName: "أحمد علي",
    contractDate: "2025-01-10",
    rentMonths: 12,
    property: "شقة رقم 4 - برج النيل",
  },
  {
    id: 2,
    contractNumber: "CN-2025-002",
    tenantName: "سارة محمد",
    contractDate: "2025-02-01",
    rentMonths: 6,
    property: "فيلا رقم 2 - كمبوند الزهور",
  },
  {
    id: 3,
    contractNumber: "CN-2025-003",
    tenantName: "محمد سعيد",
    contractDate: "2025-03-15",
    rentMonths: 24,
    property: "مكتب 12 - برج العاصمة",
  },
  {
    id: 4,
    contractNumber: "CN-2025-004",
    tenantName: "ريم خالد",
    contractDate: "2025-04-05",
    rentMonths: 18,
    property: "شقة 8 - عمارة الهدى",
  },
  {
    id: 5,
    contractNumber: "CN-2025-005",
    tenantName: "خالد حسن",
    contractDate: "2025-05-01",
    rentMonths: 12,
    property: "محل رقم 3 - مول السلام",
  },
  {
    id: 6,
    contractNumber: "CN-2025-006",
    tenantName: "نور أحمد",
    contractDate: "2025-05-15",
    rentMonths: 9,
    property: "شقة 2 - عمارة النخيل",
  },
  {
    id: 7,
    contractNumber: "CN-2025-007",
    tenantName: "عبدالله إبراهيم",
    contractDate: "2025-06-01",
    rentMonths: 12,
    property: "مخزن رقم 5 - المنطقة الصناعية",
  },
  {
    id: 8,
    contractNumber: "CN-2025-008",
    tenantName: "مها سامي",
    contractDate: "2025-06-10",
    rentMonths: 6,
    property: "شقة رقم 9 - برج المروة",
  },
  {
    id: 9,
    contractNumber: "CN-2025-009",
    tenantName: "طارق فؤاد",
    contractDate: "2025-07-01",
    rentMonths: 12,
    property: "فيلا رقم 10 - كمبوند الأندلس",
  },
  {
    id: 10,
    contractNumber: "CN-2025-010",
    tenantName: "ليلى عماد",
    contractDate: "2025-07-20",
    rentMonths: 18,
    property: "مكتب 22 - برج البستان",
  },
  {
    id: 11,
    contractNumber: "CN-2025-011",
    tenantName: "أكرم زين",
    contractDate: "2025-08-01",
    rentMonths: 12,
    property: "شقة 5 - عمارة الياسمين",
  },
  {
    id: 12,
    contractNumber: "CN-2025-012",
    tenantName: "نجلاء عادل",
    contractDate: "2025-08-15",
    rentMonths: 6,
    property: "محل رقم 8 - مول العاصمة",
  },
  {
    id: 13,
    contractNumber: "CN-2025-013",
    tenantName: "رامي يوسف",
    contractDate: "2025-09-01",
    rentMonths: 24,
    property: "مكتب 30 - برج الهدى",
  },
  {
    id: 14,
    contractNumber: "CN-2025-014",
    tenantName: "دعاء حاتم",
    contractDate: "2025-09-10",
    rentMonths: 9,
    property: "شقة رقم 6 - عمارة الفجر",
  },
  {
    id: 15,
    contractNumber: "CN-2025-015",
    tenantName: "مازن طارق",
    contractDate: "2025-10-01",
    rentMonths: 12,
    property: "فيلا رقم 5 - كمبوند اللوتس",
  },
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
