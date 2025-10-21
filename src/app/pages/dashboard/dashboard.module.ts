import { Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/components/shared.module';
import { EmptytableComponent } from '../../shared/ui/emptytable/emptytable.component';





@NgModule({
  declarations: [
    DashboardComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    // EmptytableComponent
  
  
  ]
})
export class DashboardModule { }
