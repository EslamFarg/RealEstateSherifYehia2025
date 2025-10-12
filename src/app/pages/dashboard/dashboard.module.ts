import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/components/shared.module';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';



@NgModule({
  declarations: [
    DashboardComponent,
    // ScrollAnimationDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  
  ]
})
export class DashboardModule { }
