  import { Component } from '@angular/core';

  @Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
  })
  export class DashboardComponent {

    showAndHideSidebar: any=false;



    showAndHideSidebarInDashboard(e:any){

this.showAndHideSidebar=!this.showAndHideSidebar
      // console.log(e);
      // this.showAndHideSidebar=e
    // if(e==true){this.showAndHideSidebar=false}else{this.showAndHideSidebar=true}

    }


    ngOnInit(){

      let lg=window.matchMedia('(min-width:992px)');
      if(lg.matches){
        this.showAndHideSidebar=true;
      }


      let md=window.matchMedia('(max-width:992px)');

    md.addEventListener('change',(e:any)=>{
      if(e.matches){
        this.showAndHideSidebar=false;
      }
    })
    }


  }
