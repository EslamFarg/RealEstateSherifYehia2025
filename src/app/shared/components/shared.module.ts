import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DirectivesModule } from '../directives/directives.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';





@NgModule({
  declarations: [HeaderComponent, SidebarComponent, UnauthorizedComponent ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    CommonModule,
    RouterModule,
    RouterOutlet,
    DirectivesModule
],
  exports:[HeaderComponent,SidebarComponent,]
})
export class SharedModule { }
