import { Component } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {

  showPass1:any=false;
  showPass2:any=false;
  showPass3:any=false;

  showPassword1(){
    this.showPass1=!this.showPass1

  }
  showPassword2(){
    this.showPass2=!this.showPass2

  }
  showPassword3(){
    this.showPass3=!this.showPass3

  }
}
