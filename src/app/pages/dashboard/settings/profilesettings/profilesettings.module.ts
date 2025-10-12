import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesettingsRoutingModule } from './profilesettings-routing.module';
import { ProfilesettingsComponent } from './profilesettings.component';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';


@NgModule({
  declarations: [
    ProfilesettingsComponent
  ],
  imports: [
    CommonModule,
    ProfilesettingsRoutingModule,
    PageHeadingComponent
  ]
})
export class ProfilesettingsModule { }
