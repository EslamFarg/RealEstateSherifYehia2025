import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageformsRoutingModule } from './messageforms-routing.module';
import { MessageformsComponent } from './messageforms.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';


@NgModule({
  declarations: [
    MessageformsComponent
  ],
  imports: [
    CommonModule,
    MessageformsRoutingModule,
    PaginationComponent,
    PageHeadingComponent,
    PaginationComponent
  ]
})
export class MessageformsModule { }
