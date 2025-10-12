import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() showSidebar: any=false;

  @Output() handlehideoverlay=new EventEmitter<any>();




  ngOnInit(): void {
   
    let md=window.matchMedia('(max-width:992px)');
    md.addEventListener('change',(e:any)=>{
      if(e.matches){
        this.showSidebar=false;
      }
    })
    
  }



  handleClick(){

    let md=window.matchMedia('(max-width:992px)');

    if(md.matches){
    this.showSidebar=false;
    this.handlehideoverlay.emit(false);
    }

  }

}
