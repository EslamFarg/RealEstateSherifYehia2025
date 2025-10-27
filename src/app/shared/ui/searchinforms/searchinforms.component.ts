import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from '../toastr/services/toastr.service';

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
@ViewChild('searchVal') searchVal!:ElementRef;
@Input() typeDataFilter:any
 
@Input() dataFilter:any
@Output() selectedDataFilter=new EventEmitter()
DataValue:any
toastr:ToastrService=inject(ToastrService)
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
    if (this.selectIndex === 0) {
    this.typeDataFilter = 'string';
  } else if (this.selectIndex === 1) {
    this.typeDataFilter = 'number';
    if(this.typeDataFilter){
      this.searchVal.nativeElement.value='';
    }
  }
}


writeDataValid(e:any){
  const input = e.target as HTMLInputElement;

  if(this.typeDataFilter == 'number'){
    let regex=/^[0-9]+$/

  if(regex.test(e.target.value) || e.target.value == '' ){
    input.value = input.value.replace(/[^0-9]/g, '');
   
  }else{
    input.value = '';
  }
  }

    this.selectedDataFilter.emit({
    index: this.selectIndex,
    value: this.DataValue,
    dataType: this.typeDataFilter
  });

}


onPaste(e:ClipboardEvent){

  if(this.typeDataFilter == 'number'){
    // e.preventDefault();
    const text=e.clipboardData?.getData('text') ?? '';
  const regex=/^[0-9]+$/
  if(!regex.test(text)){
    e.preventDefault();
    this.searchVal.nativeElement.value='';
  }
  }

}



SearchAboutData(){
  
  if(this.searchVal.nativeElement.value == ''){
    this.toastr.show('الرجاء ادخال البحث','error');
    return;
  }

  
  if(this.selectIndex == 0){

    this.selectedDataFilter.emit({
      index:0,
      value:this.DataValue,
      dataType:this.typeDataFilter
    })
  }else if(this.selectIndex == 1){
    // console.log('العقار')
    this.selectedDataFilter.emit({
       index:1,
       value:this.DataValue,
       dataType:this.typeDataFilter

    })
  }

}

valueSearch(val:any){
this.DataValue=val;
}



}
