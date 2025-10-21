import { Component, inject } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { Apartment } from '../models/apartment';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explorerapartment',
  templateUrl: './explorerapartment.component.html',
  styleUrl: './explorerapartment.component.scss'
})
export class ExplorerapartmentComponent {



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11 Services

_unitServices:ApartmentService=inject(ApartmentService)
toastr:ToastrService=inject(ToastrService)
_behaviorServices:EditBehaviorServiceService=inject(EditBehaviorServiceService)
router:Router=inject(Router)

  title='الرئيسيه'
  subtitle="الوحده"

  // _unit

  dataFilter=['اسم الوحده','العماره']


  // !!!!!!!!!!!!!!!!!!!!!! Property



  unitsData:{rows:Apartment[],paginationInfo:any} = {
    rows:[],
    paginationInfo:null
  }

  showDelete=false
  deleteId:any

// pagination

pageIndex=1
pageSize=10



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllDataUnit();
}

onPageChanged(page: number) {
  this.pageIndex = page;
  this.getAllDataUnit();
}


getAllDataUnit(){
  let pagination={
  
  paginationInfo: {
    pageIndex: this.pageIndex,
    pageSize:this.pageSize
  
}
  }
  this._unitServices.getAllDataUnit(pagination).subscribe((res:any)=>{
    this.unitsData=res
    console.log(this.unitsData)
  });
}


onSelectedPagination(val:any){
  this.pageSize=val
  this.getAllDataUnit();
}


getUpdateData(id:any){
this.router.navigate(['/dashboard/apartment/addapartment']);
this._behaviorServices.setId(id);
}


showDeletePopup(id:any){
  this.showDelete=true;
  this.deleteId=id

}

onClose(){
  this.showDelete=true
}

deleteConfirmed(id:any){
this.showDelete=false;
this._unitServices.deleteData(id).subscribe((res:any)=>{
  this.toastr.show('تم حذف الوحده بنجاح','success');
  this.getAllDataUnit();
})
}
}
