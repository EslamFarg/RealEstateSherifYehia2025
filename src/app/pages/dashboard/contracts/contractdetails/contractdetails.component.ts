import { Component } from '@angular/core';

@Component({
  selector: 'app-contractdetails',
  templateUrl: './contractdetails.component.html',
  styleUrl: './contractdetails.component.scss'
})
export class ContractdetailsComponent {


  dataFilter=['رقم العقد','اسم المستأجر','رقم الجوال']


  typeStatus='منتهي'
  statusContract=false;




}
