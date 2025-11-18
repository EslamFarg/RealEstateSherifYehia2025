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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PopupSearchComponent } from './shared/ui/popup-search/popup-search.component';




@NgModule({
  declarations: [
    AppComponent, 
   
    
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrComponent,
    DirectivesModule,
    BrowserAnimationsModule,
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
