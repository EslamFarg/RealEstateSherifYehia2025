import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageformsRoutingModule } from './messageforms-routing.module';
import { MessageformsComponent } from './messageforms.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    MessageformsComponent
  ],
  imports: [
    CommonModule,
    MessageformsRoutingModule,
    PaginationComponent,
    PageHeadingComponent,
    PaginationComponent,
    ReactiveFormsModule,
    EmptytableComponent,
    ConfirmDeleteComponent
  ]
})
export class MessageformsModule { }
