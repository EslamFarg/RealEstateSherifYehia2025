import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'realestate';



  router:Router=inject(Router);


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationEnd){
        window.scrollTo(0,0)
      }
    })
  }
}
