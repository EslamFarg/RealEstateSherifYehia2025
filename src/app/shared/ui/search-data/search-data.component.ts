import { NgClass } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { ToastrService } from '../toastr/services/toastr.service';

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
  @Output() selectedDataFilter=new EventEmitter()
  toastr:ToastrService=inject(ToastrService);
  
  selectIndex:any=0
  // dataValue=''

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

  searchData(input:HTMLInputElement){
    const  val=input.value.trim();
    if(val == '' || val == undefined || val == null){
      this.toastr.show('الرجاء ادخال البحث','error');
      // return;
    } 


    const dataValue={
      index: this.selectIndex,
      value: val,
    }

    
    this.selectedDataFilter.emit(dataValue);
    dataValue.value='';
    
    // val='';
    input.value = '';
  }

  SelectedData(e:any){
    const value=e.target.textContent.trim();
    const dataValue={
      index: this.selectIndex,
    }
    this.selectIndex=this.dataFilter.indexOf(value);
  

  }
}
