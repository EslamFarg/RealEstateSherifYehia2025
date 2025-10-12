import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesettingsRoutingModule } from './messagesettings-routing.module';
import { MessagesettingsComponent } from './messagesettings.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    MessagesettingsComponent
  ],
  imports: [
    CommonModule,
    MessagesettingsRoutingModule,
    PageHeadingComponent,
    NgbNavModule
  ]
})
export class MessagesettingsModule { }
