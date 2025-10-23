import { Component, DestroyRef, inject } from '@angular/core';
import { BasehttpservicesService } from '../../../../shared/services/basehttpservices.service';
import { ProfilesettingsService } from './services/profilesettings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EditBehaviorServiceService } from '../../../../shared/services/edit-behavior-service.service';
import { EditProfileImgService } from '../../../../shared/services/edit-profile-img.service';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrl: './profilesettings.component.scss'
})
export class ProfilesettingsComponent {



  _profileSettingsServices:ProfilesettingsService=inject(ProfilesettingsService)
  _editBahaviourServices:EditProfileImgService=inject(EditProfileImgService)


  _destroyRef:DestroyRef=inject(DestroyRef);

  // !!!!!!!!!!!!11 properties

   uploadProgress: number = -1;
  remainingTime: number = 0;

  imgFile:any

  getDatausers:any=[]

   
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Methods

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllDataUserProfile();
  }

  onFileSelected(e:any){
    console.log()
    let file=e.target.files[0];
    this.imgFile=URL.createObjectURL(file);


  
    var formData=new FormData();

    formData.append('Img',file);

    this._profileSettingsServices.EditProfileImg(formData).pipe(takeUntilDestroyed(this._destroyRef)).subscribe((res:any)=>{
      // console.log(res);
      const payloadStr = localStorage.getItem('payloadUser');
      if (payloadStr) {
        const payload = JSON.parse(payloadStr);
        payload.imgUrl = res;
        this._editBahaviourServices.editImg(res);
        localStorage.setItem('payloadUser', JSON.stringify(payload));
      }
      this.getAllDataUserProfile();
    })

  }


  getAllDataUserProfile(){
    this._profileSettingsServices.getDataUserProfile().pipe(takeUntilDestroyed(this._destroyRef)).subscribe((res:any)=>{
      // console.log(res);
      this.getDatausers=res
      console.log(this.getDatausers);
    })
  }

}
