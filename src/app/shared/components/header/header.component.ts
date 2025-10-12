import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { SendUserService } from '../../../../shared/services/settings/send-user.service';
import { Subscription } from 'rxjs';
// import { ToastrService } from '../../../../shared/services/toastr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone:false,
  // imports:[]
})
export class HeaderComponent {


  ShowDropDown=false;


  @Input() fullWidthMode=false;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
 

  @HostListener('document:click',['$event'])
  clickout(event:any){
  //  if(!event.target.classList.contains('drop_down_profile')){
  //   this.ShowDropDown=false;
  //  }

  // console.log( );

  if(!event.target.closest('.drop_down_profile')){
    this.ShowDropDown=false;
  }
  }


  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
    console.log(this.fullWidthMode)
  }


  showAndHideSidebar(){

    this.toggleSidebarForMe.emit(false);

  }

}
