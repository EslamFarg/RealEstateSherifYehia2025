import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-formerror-msg',
  standalone:true,
imports:[NgIf,NgFor],  
  templateUrl: './formerror-msg.component.html',
  styleUrl: './formerror-msg.component.scss',
  
  
})
export class FormerrorMsgComponent {

  @Input() control!:AbstractControl | null

  @Input() Messages:any
  
  errors:any

// ngOnInit(){
  // this.keyError();
// }
  get keyError(){
    if(!this.control || !this.control.errors) return [];
    const keys = Object.keys(this.control.errors);
     return keys.map(key => this.Messages[key] || key);
    
  }

}
