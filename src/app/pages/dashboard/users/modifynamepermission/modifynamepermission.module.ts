import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifynamepermissionRoutingModule } from './modifynamepermission-routing.module';
import { ModifynamepermissionComponent } from './modifynamepermission.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';


@NgModule({
  declarations: [
    ModifynamepermissionComponent,
    
  ],
  imports: [
    CommonModule,
    ModifynamepermissionRoutingModule,
    PageHeadingComponent,
    PaginationComponent,
    EmptytableComponent
  ]
})
export class ModifynamepermissionModule { }
