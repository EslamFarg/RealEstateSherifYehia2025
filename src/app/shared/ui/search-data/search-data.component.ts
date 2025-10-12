import { NgClass } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
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
  @Input() dropDownTitle:any
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
}
