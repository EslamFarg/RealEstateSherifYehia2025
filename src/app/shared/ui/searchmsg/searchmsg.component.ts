import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedService } from '../../services/shared.service';
import { SendmessageService } from '../../../pages/dashboard/messages/sendmessage/services/sendmessage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from '../toastr/services/toastr.service';

@Component({
  selector: 'app-searchmsg',
  templateUrl: './searchmsg.component.html',
  styleUrl: './searchmsg.component.scss',
  standalone:true,
  imports: [FormsModule, NgSelectModule, ReactiveFormsModule]
})
export class SearchmsgComponent {
@Input() showPopup:any = false;
fb:FormBuilder=inject(FormBuilder);
_SendMsgSer:SendmessageService=inject(SendmessageService);
destroyRef:DestroyRef=inject(DestroyRef)
toastr:ToastrService=inject(ToastrService)
// @Output() 
@Output() showPopupChange = new EventEmitter<boolean>();
 _sharedServices:SharedService=inject(SharedService);
SearchForm=this.fb.group({
  property:[null,[Validators.required]]
})

getDataCities:any=[];
getDataDistricts:any=[];
getDataProperties:any=[];
idSearchProperties:any
closePopup() {
  this.showPopup = false;
  this.showPopupChange.emit(this.showPopup);
}


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
  },
   {
    "id": 6,
    name: "Layla Ibrahim",
    "phone": "01003334444",
    "email": "layla.ibrahim@example.com",
    checked:false
  },
   {
    "id": 7,
    name: "Layla Ibrahim",
    "phone": "01003334444",
    "email": "layla.ibrahim@example.com",
    checked:false
  },
   {
    "id": 8,
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


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllDataCites();
  }

 onChange(e:any,item:any){


  if(item.checked){
    if(!this.itemsArr.find((el:any)=>el.id == item.id)){
      this.itemsArr.push(item);    
    }  
  }else{

      this.itemsArr=this.itemsArr.filter((el:any)=>el.id != item.id);
    }


    console.log(this.itemsArr);
  
 }
 
 addItems(){


   this.arrDataCheck.emit(this.itemsArr);
   this.showPopup = false;

   
 
 }


 
 onSubmit(){
  // debugger;
  if(this.SearchForm.valid){

    let idSearchProperties=this.SearchForm.value.property;
    // this.SelectedDistritByProperty(idSearchProperties);
    this._SendMsgSer.getAndPropertyByTenant(idSearchProperties,{}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res)=>{
      console.log(res);
      // this.dataSearch=res.rows
    })
    
  }else{
    this.toastr.show('يجب تعبئة الحقول المطلوبة', 'error');

  }

 }

 getAllDataCites(){
  this.getDataCities=this._sharedServices.allCities
}

 selectedcities(e:any){

  if(!e){
    this.getDataDistricts=[];
    this.getDataProperties=[];
    this.SearchForm.get('property')?.setValue(null);
    return;
  }
  // console.log(e);
  const id=e.city_id
  if(id){
this.getDataDistricts=this._sharedServices.allDistricts.filter((item:any)=>item.city_id==id)
  }else{
    this.getDataDistricts=[];
  }
}



SelectedDistritByProperty(e:any){
  // console.log(e);
  if(!e){
    this.getDataProperties=[];
    this.SearchForm.get('property')?.setValue(null);
    return
  }
  let ShapeDataFilter={
  criteriaDto: {
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  },
  searchFilter: {
    column: 4,
    value: e.name_ar
  }
}

  this._SendMsgSer.getByProperty(ShapeDataFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
    console.log(res);
    this.getDataProperties=res?.rows
  })

  

}


getIdSearch(e:any){

  if(!e){
    this.idSearchProperties=0;
    this.SearchForm.get('property')?.setValue(null);
    this.getDataProperties=[];
    return
  }
  this.idSearchProperties=e.id
  console.log(this.idSearchProperties);
}


}
