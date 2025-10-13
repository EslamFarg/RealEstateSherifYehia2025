import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfilesettingsService } from '../services/profilesettings.service';
import { PasswordStrengthValidator } from '../../../../../shared/validations/password-strength.validator';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {

  // !!!!!!!!!!!!!!!!!!!!!!! services
  fb:FormBuilder=inject(FormBuilder);
  _profileSettings:ProfilesettingsService=inject(ProfilesettingsService);
  toastr:ToastrService=inject(ToastrService);



  // !!!!!!!!!!!!!!!!!!!!!!!! Property
  showPass1:any=false;
  showPass2:any=false;
  showPass3:any=false;
  errorMsgConfirmedPassword:any

  formchangePassword=this.fb.group({
    
  oldPassword: ['',Validators.required],
  newPassword: ['',[Validators.required, PasswordStrengthValidator.strong]],
  confirmNewPassword: ['',Validators.required],

  },
{
  validator: this.passwordMatchValidator 
}
)

  showPassword1(){
    this.showPass1=!this.showPass1

  }
  showPassword2(){
    this.showPass2=!this.showPass2

  }
  showPassword3(){
    this.showPass3=!this.showPass3

  }



  OnSubmit(){
     
    if(this.formchangePassword.valid){

      this._profileSettings.changePassword(this.formchangePassword.value).subscribe((res:any)=>{
        this.formchangePassword.reset();
        this.toastr.show('تم تغيير كلمة المرور بنجاح','success');
      })
   
    }else{
      this.formchangePassword.markAllAsTouched();
    }
  }




  
  passwordMatchValidator(form: any) {
  const newPass = form.get('newPassword')?.value;
  const confirmPass = form.get('confirmNewPassword')?.value;
  return newPass === confirmPass ? null : { mismatch: true };
}


  
}
