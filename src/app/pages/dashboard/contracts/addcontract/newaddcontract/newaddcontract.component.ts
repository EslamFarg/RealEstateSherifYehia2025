import { Component } from '@angular/core';

@Component({
  selector: 'app-newaddcontract',
  templateUrl: './newaddcontract.component.html',
  styleUrl: './newaddcontract.component.scss'
})
export class NewaddcontractComponent {


  msgTextarea='';


  changeMsg(e:any){

   this.msgTextarea=e.messageValue;

  }

   datamsg=[
    {
      id:1,
    
      messageName:'رساله 1',
      messageValue:'بيانات الرساله 1'
    },
    {
      id:2,
    
      messageName:'رساله 2',
      messageValue:'بيانات الرساله 2'
    },
    {
      id:3,
    
      messageName:'رساله 3',
      messageValue:'بيانات الرساله 3'
    },
    {
      id:4,
    
      messageName:'رساله 4',
      messageValue:'بيانات الرساله 4'
    },
  ]
}
