import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-popup-search-tenant',
  templateUrl: './popup-search.component.html',
  styleUrl: './popup-search.component.scss',
  standalone:true,
  imports:[NgClass,NgFor]
})
export class PopupSearchTenantComponent {

  @Input() isVisible:any=false;
  @Input() dataArraySearch:any
  @Output() closePopup = new EventEmitter<void>();
  @Output() sendDataSelectedSearch=new EventEmitter();
  // @Output() closePopup=new EventEmitter()






  selectItem(item:any){

    // this.closePopup.emit(item)
    this.sendDataSelectedSearch.emit(item)
  }


  close(){
    this.closePopup.emit();
   }

  







}
