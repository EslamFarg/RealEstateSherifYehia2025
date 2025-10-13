import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfilesettingsService } from '../services/profilesettings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


  // !!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb:FormBuilder=inject(FormBuilder);
  destroyref:DestroyRef=inject(DestroyRef)
  _profileSettingsServices:ProfilesettingsService=inject(ProfilesettingsService)

  // !!!!!!!!!!!!!!!!!!!!!!!!!! Property

  profileData:any=this.fb.group({
    
  fullName: ['',[Validators.required]],
  imageUrl: ['',[Validators.required]],
  email: ['',[Validators.required,Validators.email]],
  phoneNumber: ['',[Validators.required]],
  emailConfirmed: [true, [Validators.required]]
  })







  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! methods


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.getAllDataProfile();
  }


  onSubmit(){
    if(this.profileData.valid){



    }else{
      this.profileData.markAllAsTouched();
    }

  }


  getAllDataProfile(){

    this._profileSettingsServices.getDataUserProfile().pipe(takeUntilDestroyed(this.destroyref)).subscribe((res:any)=>{

      this.profileData.patchValue(res)

    })
    
  }






}
