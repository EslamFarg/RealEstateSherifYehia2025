import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'realestate';


  LoadingService:LoadingService=inject(LoadingService)
  loading$ = this.LoadingService.loading

  router:Router=inject(Router);

   loading: boolean =false;

  ngOnInit(): void {
    this.loading=true
    this.router.events.subscribe((event:any)=>{
      if(event instanceof NavigationEnd){
        window.scrollTo(0,0)
      }
    })
  }

}
