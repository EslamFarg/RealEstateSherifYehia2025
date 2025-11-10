import { Component } from '@angular/core';

@Component({
  selector: 'app-treereal',
  templateUrl: './treereal.component.html',
  styleUrl: './treereal.component.scss'
})
export class TreerealComponent {

  getDataSelected:any
  


  getAllDataSelectedUnit(e:any){
    console.log("Selected",e);
    

    this.getDataSelected=e;
  }
}
