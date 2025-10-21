import { NgClass } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchinforms',
  templateUrl: './searchinforms.component.html',
  styleUrl: './searchinforms.component.scss',
  standalone:true,
  imports:[NgClass,FormsModule]
})
export class SearchinformsComponent {
showFilterData=false;
selectIndex:any=0
@Input() backgroundForm:any;

@Input() dataFilter:any
@Output() selectedDataFilter=new EventEmitter()
DataValue:any

// @



@HostListener('document:click',['$event'])

onClick(e:any){
//  console.log(e);
if(!e.target.closest('.filter_data')){
  this.showFilterData=false;
}
}




selectDataFilter(i:any){
  this.selectIndex = i
}



SearchAboutData(){
  
  if(this.selectIndex == 0){

    this.selectedDataFilter.emit({
      index:0,
      value:this.DataValue
    })
  }else{
    // console.log('العقار')
    this.selectedDataFilter.emit({
       index:0,
      value:this.DataValue
    })
  }

}

valueSearch(val:any){
this.DataValue=val;
}



}
