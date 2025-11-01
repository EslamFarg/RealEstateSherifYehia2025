import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { ToastrComponent } from "./shared/ui/toastr/toastr.component";
import { DirectivesModule } from './shared/directives/directives.module';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { LoadingComponent } from './shared/components/loading/loading.component';




@NgModule({
  declarations: [
    AppComponent,
   
   
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrComponent,
    DirectivesModule,
    LoadingComponent
],
  providers: [
    provideHttpClient(
      withInterceptors([errorInterceptor,authInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
