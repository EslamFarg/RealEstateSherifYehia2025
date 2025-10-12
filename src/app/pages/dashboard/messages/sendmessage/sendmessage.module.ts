import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendmessageRoutingModule } from './sendmessage-routing.module';
import { SendmessageComponent } from './sendmessage.component';


@NgModule({
  declarations: [
    SendmessageComponent
  ],
  imports: [
    CommonModule,
    SendmessageRoutingModule
  ]
})
export class SendmessageModule { }
