import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [HomeComponent,


  ],
  imports: [
    
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    BaseChartDirective
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),

      //  CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeModule { }
