import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrl: './page-heading.component.scss',
  imports: [NgIf,RouterModule,RouterOutlet],
  standalone:true,
})
export class PageHeadingComponent {

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() description:string = '';

  @Input() explorerBtn: boolean = false;
  @Input() AddBtn: boolean = false;
  @Input() showdescription:boolean=false;
// routes
  @Input() ExplorerRoute: string = '';
  @Input() AddRoute: string = '';

  // Title Btn

  @Input() TitlePageExplorerBtn:any = '';
  @Input() TitlePageAddBtn:any = '';
}
