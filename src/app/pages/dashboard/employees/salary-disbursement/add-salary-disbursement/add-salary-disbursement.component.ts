import { Component } from '@angular/core';

@Component({
  selector: 'app-add-salary-disbursement',
  templateUrl: './add-salary-disbursement.component.html',
  styleUrl: './add-salary-disbursement.component.scss'
})
export class AddSalaryDisbursementComponent {


  showEmployeePopup=false;

  employeesSalary = [
  {
    id: 1,
    name: "أحمد علي",
    salary: 5000,
    fund: 200,
    absenceDays: 2,
    loanRepayment: 300,
    penalties: 100,
    bonuses: 500,
    netSalary: 5100
  },
  {
    id: 2,
    name: "محمد حسن",
    salary: 4500,
    fund: 150,
    absenceDays: 0,
    loanRepayment: 0,
    penalties: 0,
    bonuses: 200,
    netSalary: 4850
  },
  {
    id: 3,
    name: "خالد محمود",
    salary: 6000,
    fund: 300,
    absenceDays: 1,
    loanRepayment: 500,
    penalties: 200,
    bonuses: 0,
    netSalary: 5600
  },
  {
    id: 4,
    name: "محمود إبراهيم",
    salary: 4800,
    fund: 250,
    absenceDays: 3,
    loanRepayment: 0,
    penalties: 150,
    bonuses: 100,
    netSalary: 4700
  },
  {
    id: 5,
    name: "سعيد أحمد",
    salary: 5200,
    fund: 180,
    absenceDays: 0,
    loanRepayment: 200,
    penalties: 0,
    bonuses: 300,
    netSalary: 5520
  },
  {
    id: 6,
    name: "يوسف علي",
    salary: 7000,
    fund: 400,
    absenceDays: 2,
    loanRepayment: 600,
    penalties: 200,
    bonuses: 500,
    netSalary: 7200
  },
  {
    id: 7,
    name: "مروان طارق",
    salary: 4300,
    fund: 120,
    absenceDays: 1,
    loanRepayment: 0,
    penalties: 100,
    bonuses: 0,
    netSalary: 4120
  },
  {
    id: 8,
    name: "زياد عادل",
    salary: 5500,
    fund: 200,
    absenceDays: 0,
    loanRepayment: 0,
    penalties: 0,
    bonuses: 400,
    netSalary: 5700
  },
  {
    id: 9,
    name: "رامي حسن",
    salary: 4700,
    fund: 150,
    absenceDays: 2,
    loanRepayment: 300,
    penalties: 0,
    bonuses: 100,
    netSalary: 4650
  },
  {
    id: 10,
    name: "وليد عبد الله",
    salary: 6200,
    fund: 350,
    absenceDays: 0,
    loanRepayment: 200,
    penalties: 100,
    bonuses: 200,
    netSalary: 6250
  }
];

}
