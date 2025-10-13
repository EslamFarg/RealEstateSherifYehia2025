import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewuserRoutingModule } from './newuser-routing.module';
import { NewuserComponent } from './newuser.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { RefreshSelectComponent } from '../../../../shared/ui/refresh-select/refresh-select.component';
import { PaginationComponent } from '../../../../shared/ui/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { DirectivesModule } from '../../../../shared/directives/directives.module';
import { EmptytableComponent } from '../../../../shared/ui/emptytable/emptytable.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { DirectivesModule } from '../../../../shared/directives/directives.module';
// import { NoStringPasteDirective } from '../../../../shared/directives/no-string-paste.directive';



@NgModule({
  declarations: [
    NewuserComponent,
    EmptytableComponent,
  ],
  imports: [
    CommonModule,
    NewuserRoutingModule,
    PageHeadingComponent,
    RefreshSelectComponent,
    PaginationComponent,
    ReactiveFormsModule,
    ConfirmDeleteComponent,
    DirectivesModule
    
  ]
})
export class NewuserModule { }
