import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfilesettingsService } from '../services/profilesettings.service';
import { ToastrService } from '../../../../../shared/ui/toastr/services/toastr.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.scss'
})
export class ChangeEmailComponent {
  // !!!!!!!!!!!!!!!!!!!!!!!!!!! Services

  fb:FormBuilder=inject(FormBuilder);

  _profilesettingsServices:ProfilesettingsService=inject(ProfilesettingsService)
  toastr:ToastrService=inject(ToastrService)


  // !!!!!!!!!!!!!!!!!!!!!!!!!!! Property

   payloadUser=JSON.parse(localStorage.getItem('payloadUser')!)
  ngOnInit(){
    
    
  }
  changeemailForm=this.fb.group({
   userId: [this.payloadUser.userId,[Validators.required]],
  newEmail: ['',[Validators.required,Validators.email]],
  password: ['',Validators.required]
  })



  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Methods


  onSubmit(){
    debugger
    if(this.changeemailForm.valid){
      let data={
        userId:this.changeemailForm.value.userId,
        newEmail:this.changeemailForm.value.newEmail,
        password:this.changeemailForm.value.password

      }


      this._profilesettingsServices.editChangeEmail(data).subscribe((res)=>{
        this.toastr.show('تم التعديل بنجاح','success');
        this.changeemailForm.reset();
        
      })
      

    }else{
      this.changeemailForm.markAllAsTouched();
    }
  }


}
