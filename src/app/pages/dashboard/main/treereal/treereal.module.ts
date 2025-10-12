import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreerealRoutingModule } from './treereal-routing.module';
import { TreerealComponent } from './treereal.component';
import { PagerComponent } from 'ngx-bootstrap/pagination';
import { PageHeadingComponent } from '../../../../shared/ui/page-heading/page-heading.component';
import { SearchDataComponent } from "../../../../shared/ui/search-data/search-data.component";
import { TreePropertyPackageComponent } from '../../../../shared/ui/tree-property-package/tree-property-package.component';
import { SearchinformsComponent } from '../../../../shared/ui/searchinforms/searchinforms.component';


@NgModule({
  declarations: [
    TreerealComponent
  ],
  imports: [
    CommonModule,
    TreerealRoutingModule,
    PageHeadingComponent,
    SearchDataComponent,
    TreePropertyPackageComponent,
    SearchinformsComponent
]
})
export class TreerealModule { }
