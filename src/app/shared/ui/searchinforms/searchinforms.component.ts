import { NgClass } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-searchinforms',
  templateUrl: './searchinforms.component.html',
  styleUrl: './searchinforms.component.scss',
  standalone:true,
  imports:[NgClass]
})
export class SearchinformsComponent {
showFilterData=false;
selectIndex:any=0
@Input() backgroundForm:any;

@Input() dataFilter:any


@HostListener('document:click',['$event'])

onClick(e:any){
//  console.log(e);
if(!e.target.closest('.filter_data')){
  this.showFilterData=false;
}
}


}
