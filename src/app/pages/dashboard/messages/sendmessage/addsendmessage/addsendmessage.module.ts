import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddsendmessageRoutingModule } from './addsendmessage-routing.module';
import { AddsendmessageComponent } from './addsendmessage.component';
import { PageHeadingComponent } from '../../../../../shared/ui/page-heading/page-heading.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchmsgComponent } from "../../../../../shared/ui/searchmsg/searchmsg.component";
import { TitleMsgPopupComponent } from "../../../../../shared/ui/title-msg-popup/title-msg-popup.component";
import { FormsModule } from '@angular/forms';
import { SendsingularmessageComponent } from '../../../../../shared/components/sendsingularmessage/sendsingularmessage.component';
import { SendpluralmessageComponent } from '../../../../../shared/components/sendpluralmessage/sendpluralmessage.component';

@NgModule({
  declarations: [
    AddsendmessageComponent
  ],
  imports: [
    CommonModule,
    AddsendmessageRoutingModule,
    PageHeadingComponent,
    NgbNavModule,
    SearchmsgComponent,
    TitleMsgPopupComponent,
    FormsModule,
    SendsingularmessageComponent,
    SendpluralmessageComponent
]
})
export class AddsendmessageModule { }
