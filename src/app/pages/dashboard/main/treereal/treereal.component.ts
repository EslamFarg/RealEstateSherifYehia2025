import { Component } from '@angular/core';

@Component({
  selector: 'app-treereal',
  templateUrl: './treereal.component.html',
  styleUrl: './treereal.component.scss'
})
export class TreerealComponent {

  getDataSelected:any
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

  }
}
