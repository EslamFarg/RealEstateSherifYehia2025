import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-printemployee',
  templateUrl: './printemployee.component.html',
  styleUrl: './printemployee.component.scss',
  standalone:true,
  imports:[NgFor,NgClass,FormsModule]
})
export class PrintemployeeComponent {

  @Input() showPopup=false;
    employees = [
    { name: 'محمد احمد محمود', checked: false },
    { name: 'احمد علي', checked: false },
    { name: 'سعيد حسن', checked: false },
    { name: 'محمود ابراهيم', checked: false },
    { name: 'علي عبدالله', checked: false },
  ];


   selectCheck=false;
  toggleAll(){
    this.selectCheck=!this.selectCheck
    this.employees.forEach((emp)=>{
      emp.checked=this.selectCheck;
    })
  }
}
