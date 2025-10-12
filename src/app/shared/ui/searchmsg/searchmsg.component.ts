import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-searchmsg',
  templateUrl: './searchmsg.component.html',
  styleUrl: './searchmsg.component.scss',
  standalone:true,
  imports:[FormsModule,NgSelectModule]
})
export class SearchmsgComponent {
@Input() showPopup=false;
    employees = [
    { name: 'محمد احمد محمود', checked: false },
    { name: 'احمد علي', checked: false },
    { name: 'سعيد حسن', checked: false },
    { name: 'محمود ابراهيم', checked: false },
    { name: 'علي عبدالله', checked: false },
  ];



 @Output() arrDataCheck=new EventEmitter();

  dataSearch=[
  {
    "id": 1,
    name: "Ahmed Ali",
    "phone": "01001234567",
    "email": "ahmed.ali@example.com",
    checked:false
  },
  {
    "id": 2,
    name: "Sara Mohamed",
    "phone": "01007654321",
    "email": "sara.mohamed@example.com",
    checked:false
  },
  {
    "id": 3,
    name: "Omar Khaled",
    "phone": "01009876543",
    "email": "omar.khaled@example.com",
    checked:false
  },
  {
    "id": 4,
    name: "Noor Hassan",
    "phone": "01005556667",
    "email": "noor.hassan@example.com",
    checked:false
  },
  {
    "id": 5,
    name: "Layla Ibrahim",
    "phone": "01003334444",
    "email": "layla.ibrahim@example.com",
    checked:false
  }
]




   selectCheck=false;
  toggleAll(){
   this.selectCheck = !this.selectCheck;

  this.dataSearch.forEach((data) => {
    data.checked = this.selectCheck;
  });

  if (this.selectCheck) {    
    this.itemsArr = this.dataSearch;
  } else {
    this.itemsArr = [];
  }
  }



   itemsArr:any=[];

 onChange(e:any,item:any){
  // console.log(item);

  console.log(item.checked)

  if(item.checked){
    if(!this.itemsArr.find((el:any)=>el.id == item.id)){
      // this.itemsArr.push(item);   
      this.itemsArr=item; 
    }  
  }else{

      this.itemsArr=this.itemsArr.filter((el:any)=>el.id != item.id);
    }


    console.log(this.itemsArr);
  
 }
 
 addItems(){


   this.arrDataCheck.emit(this.itemsArr);

   
 
 }
}
