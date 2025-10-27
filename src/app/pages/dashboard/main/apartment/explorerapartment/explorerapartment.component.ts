import { Component, DestroyRef, inject } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';
import { Apartment } from '../models/apartment';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';
import { EditBehaviorServiceService } from '../../../../../shared/services/edit-behavior-service.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
destroyRef:DestroyRef=inject(DestroyRef);

  title='الرئيسيه'
  subtitle="الوحده"

  // _unit

  dataFilter=['اسم الوحده','اسم العماره','السعر']


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



onSearchFilter(e:any){
  console.log(e);
  let ShapeDataFilter={
  criteriaDto: {
    paginationInfo: {
      pageIndex: 0,
      pageSize: 0
    }
  },
  searchFilter: {
    column: 1,
    value: e.value
  }
}


if(e.index == 0){

  ShapeDataFilter.searchFilter.column=1;

}else if(e.index == 1){
  ShapeDataFilter.searchFilter.column=6;
}else if(e.index == 2){
  ShapeDataFilter.searchFilter.column=5;
}else{
  ShapeDataFilter.searchFilter.column=0;
}
this._unitServices.searchDataUnit(ShapeDataFilter).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  this.unitsData=res;
  console.log(res);

})
}

}

