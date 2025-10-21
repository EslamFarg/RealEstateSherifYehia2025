import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsettingsRoutingModule } from './programsettings-routing.module';
import { ProgramsettingsComponent } from './programsettings.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProgramsettingsComponent
  ],
  imports: [
    CommonModule,
    ProgramsettingsRoutingModule,
    NgSelectModule,
    ReactiveFormsModule
  ]
})
export class ProgramsettingsModule { }
