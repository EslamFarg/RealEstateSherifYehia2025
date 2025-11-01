import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from '../toastr/services/toastr.service';

@Component({
  selector: 'app-searchinforms',
  templateUrl: './searchinforms.component.html',
  styleUrl: './searchinforms.component.scss',
  standalone:true,
  imports:[NgClass,FormsModule,ReactiveFormsModule]
})
export class SearchinformsComponent {
showFilterData=false;
selectIndex:any=0
@Input() backgroundForm:any;
@ViewChild('searchVal') searchVal!:ElementRef;
@Input() typeDataFilter:any
 @Input() fc!:FormControl;
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
  // console.log(i)
  
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



SearchAboutData(val:any){

  const value=val.value.trim();
  
  
  if(value.trim() == '' || value.trim() == undefined || value.trim() == null){
    this.toastr.show('الرجاء ادخال البحث','error');
    return;
  }


  let dataSearch={
    index:this.selectIndex,
    value:value,
  }
  // console.log(dataSearch);
  this.selectedDataFilter.emit(dataSearch);
  // this.fc.setValue('');

}

valueSearch(val:any){
this.DataValue=val;
}



}
