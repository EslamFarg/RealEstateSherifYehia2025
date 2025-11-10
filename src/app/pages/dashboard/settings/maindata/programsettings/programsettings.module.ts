import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsettingsRoutingModule } from './programsettings-routing.module';
import { ProgramsettingsComponent } from './programsettings.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from "../../../../../shared/directives/directives.module";


@NgModule({
  declarations: [
    ProgramsettingsComponent
  ],
  imports: [
    CommonModule,
    ProgramsettingsRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    DirectivesModule
]
})
export class ProgramsettingsModule { }
