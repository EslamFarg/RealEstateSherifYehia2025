import { NgClass } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrl: './search-data.component.scss',
  standalone:true,
  imports: [NgClass]
})
export class SearchDataComponent {

  showFilterData=false;

  @Input() dataFilter:any
  @Input() dropDownTitle:any;
  @Output() sendDataSelect=new EventEmitter()
  selectIndex:any=0

  showFilter(){
    this.showFilterData=!this.showFilterData
  }


  @HostListener('document:click',['$event'])


  Clickout(e:any){


    if(!e.target.closest('.input_search')){
      this.showFilterData=false;
    }

    // console.log(e);
    // if(e.)
  }

  showDataPagination(e:any){
    const value=Number(e.target.value);
    this.sendDataSelect.emit(value);
  }
}
