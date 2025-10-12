import { Component } from '@angular/core';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrl: './profilesettings.component.scss'
})
export class ProfilesettingsComponent {


  imgFile:any


  onFileSelected(e:any){
    console.log()
    let file=e.target.files[0];
    this.imgFile=URL.createObjectURL(file);


  }
}
