import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmptytableComponent } from '../ui/emptytable/emptytable.component';
import { LoadingComponent } from './loading/loading.component';
import { DirectivesModule } from '../directives/directives.module';
// import { AccountsRoutingModule } from "../../pages/accounting/accounts/accounts-routing.module";




@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
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
