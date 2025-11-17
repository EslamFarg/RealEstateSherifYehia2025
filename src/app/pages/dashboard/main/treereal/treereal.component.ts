import { Component, DestroyRef, inject } from '@angular/core';
import { TreerealService } from './services/treereal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../../../environments/environment';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
register();
// import { SwiperComponent } from 'swiper/bundle/swiper';
// import { defineCustomElements } from 'swiper/element/bundle';

// import { }
@Component({
  selector: 'app-treereal',
  templateUrl: './treereal.component.html',
  styleUrl: './treereal.component.scss'
})
export class TreerealComponent {

  _TreeServices:TreerealService=inject(TreerealService);
  destroyRef:DestroyRef=inject(DestroyRef)

  environmentUrl=environment.apiUrl

  getDataSelected:any
initialSlide = 0;
  AllDataTreeProperty:any
  dataFilter=[
    {
      id:1,
      name:'المدينه',
    },
    {
      id:2,
      name:'الحي'
    },
    {
      id:3,
      name:'العقار'
    },
    {
      id:4,
      name:'الوحده'
    }
  ]
   
  


  getAllDataSelectedUnit(e:any){
    console.log("Selected",e);



    

    this.getDataSelected=e;
    
  }


  onSeachFilter(e:any){
    console.log(e);


  let shapeSearch={
  "criteriaDto": {
    "paginationInfo": {
      "pageIndex": 0,
      "pageSize": 0
    }
  },
  "searchFilter": {
    "column": 0,
    "value": e.value
  }
}


if(e.index == 0){
  shapeSearch.searchFilter.column= 17;
}else if(e.index == 1){
  shapeSearch.searchFilter.column= 1;
}else if(e.index == 2){
  shapeSearch.searchFilter.column= 2;
}else if(e.index == 3){
  shapeSearch.searchFilter.column= 3;
}


this._TreeServices.getDataPropertyTree(shapeSearch).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
  console.log(res);
 
  this.AllDataTreeProperty=res;
  const total = this.getDataSelected.attachments.length;
  this.initialSlide = Math.floor(total / 2);
})




  }
}
