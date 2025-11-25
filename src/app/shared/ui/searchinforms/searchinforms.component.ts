import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, ElementRef, EventEmitter, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from '../toastr/services/toastr.service';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { SearchinformsService } from './services/searchinforms.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-searchinforms',
  templateUrl: './searchinforms.component.html',
  styleUrl: './searchinforms.component.scss',
  standalone:true,
  imports:[NgClass,FormsModule,ReactiveFormsModule,CommonModule]
})
export class SearchinformsComponent {
  searchInFormsServices=inject(SearchinformsService)
showFilterData=false;
selectIndex:any=0
@Input() backgroundForm:any;
@ViewChild('searchVal') searchVal!:ElementRef;
@Input() typeDataFilter:any
 @Input() fc!:FormControl;
@Input() dataFilter:any

@Input() showAutocompleteSearch:any=false;


@Output() selectedDataFilter=new EventEmitter()
DataValue:any
toastr:ToastrService=inject(ToastrService)
@Input() autoList: any[] = [];
destroyRef:DestroyRef=inject(DestroyRef)
// @



@HostListener('document:click',['$event'])

onClick(e:any){
//  //console.log(e);
if(!e.target.closest('.filter_data')){
  this.showFilterData=false;
}
}




selectDataFilter(i:any){
  this.selectIndex = i
  // //console.log(i)
  
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
  // //console.log(dataSearch);
  this.selectedDataFilter.emit(dataSearch);
  // this.fc.setValue('');

}

valueSearch(val:any){
this.DataValue=val;
}


filteredList: any[] = [];
showAutocomplete: boolean = false;

ngOnInit(){
  this.getAllDataUser();
}

getDatausers:any=[]


getAllDataUser(){
    this.searchInFormsServices.getAllDataUsers().pipe((takeUntilDestroyed(this.destroyRef))).subscribe((res:any)=>{
      this.getDatausers=res.items;
      //console.log(this.getDatausers);
    })
}




SearchInVal(e:any){
  const val = e.target.value?.trim();

  if(!val){
    this.showAutocomplete = false;
    this.filteredList = [];
    return;
  }

  if(this.selectIndex === 0){
    this.filteredList = this.getDatausers.filter((item:any) =>
      item?.fullName?.toLowerCase().includes(val.toLowerCase())
    );
  } else if(this.selectIndex === 1){ 
    this.filteredList = this.getDatausers.filter((item:any) =>
      item?.phoneNumber?.toString().includes(val)
    );
  } 


  this.showAutocomplete = this.filteredList.length > 0;
    this.selectedDataFilter.emit({
    index: this.selectIndex,
    value: val
  });
}



@Output() selectedUserId=new EventEmitter();
selectedUser(item:any){


  this.showAutocomplete = false;
  this.filteredList = [];
  this.searchVal.nativeElement.value=item.fullName

  
  this.selectedUserId.emit(item.userId);

}

}
