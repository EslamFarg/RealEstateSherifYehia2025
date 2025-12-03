import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PopupAddGroupComponent } from '../../../../shared/ui/popup-add-group/popup-add-group.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    NgSelectModule,
    PopupAddGroupComponent,
    FormsModule,
    ReactiveFormsModule
]
})
export class PermissionsModule { }
