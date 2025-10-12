import { Component, ElementRef, inject, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from '../../shared/ui/toastr/services/toastr.service';
import { checkUsername } from '../../shared/validations/checkUsername';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  fb:FormBuilder=inject(FormBuilder);
  router:Router=inject(Router)
  scription!:Subscription;
  toastr:ToastrService=inject(ToastrService)
// loginSer:LoginS=inject(LoginService)
// authSer:AuthService=inject(AuthService);
  otpCodeValue:any
  counter=180;
  @ViewChild('login',{read:TemplateRef}) login!:TemplateRef<any>;
  @ViewChild('otpcodetem',{read:TemplateRef}) otpcodetem!:TemplateRef<any>;
  @ViewChild('container',{read:ViewContainerRef}) vcr!:ViewContainerRef

  @ViewChild('resetpassword',{read:TemplateRef}) resetpass!:TemplateRef<any>;
  @ViewChild('emailForgot',{read:TemplateRef}) emailForgot!:TemplateRef<any>;

  passwordForm: any;
  showNewPassword = false;
  showConfirmPassword = false;

    
ngOnInit() {


    // this.router.navigate(['/dashboard/home']);
  

  this.passwordForm = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
}



  otpArray = [0, 0, 0, 0,0,0]; // عدد خانات OTP

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  // auth:AuthService=inject(AuthService)
  authForm=this.fb.group({
    emailOrUserName:['',[Validators.required,Validators.minLength(3),checkUsername.ValidationUsername()]],
    password:['',Validators.required]
  })


  emailForm=this.fb.group({
    email:['',[Validators.required,Validators.email]]
  })


ngAfterViewInit(): void {

this.vcr.clear();

this.vcr.createEmbeddedView(this.login);


}


goBack(){

this.vcr.clear();
this.vcr.createEmbeddedView(this.login);
}
  onSubmit(){

    this.router.navigate(['/dashboard'])

    
 if(this.authForm.valid){
          const data={
        username:this.authForm.value.emailOrUserName,
        password:this.authForm.value.password
      }


    
    }else{
      this.authForm.markAllAsTouched();
    }
    
   

  }


  showreset:any=false;
  showemail:any

  sendOtpCode(){

    this.vcr.clear();
    this.vcr.createEmbeddedView(this.otpcodetem);
    if(this.emailForm.valid){
      let email={
        email:this.emailForm.value.email
      }
 
    }else{
      this.emailForm.markAllAsTouched();
      
    }
 
  }
 

  replaySend(){
      this.showreset = false;
      
  const email = {
    email: this.emailForm.value.email
  };

  }
submitNewPassword() {
  if (this.passwordForm.valid) {
    const { newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.toastr.show('كلمتا المرور غير متطابقتين', 'error');
      return;
    }

    const data = {
      email: this.emailForm.get('email')?.value,
      otpCode: this.otpCodeValue,
      newPassword: confirmPassword
    };

   

  } else {
    this.passwordForm.markAllAsTouched();
    this.toastr.show('يرجى تعبئة الحقول بشكل صحيح', 'error');
  }
}




  otpcode(){

    this.vcr.clear()
    this.vcr.createEmbeddedView(this.emailForgot);

    // this.vcr.clear();
    // this.vcr.createEmbeddedView(this.resetpass);

  }


enterData() {

  this.vcr.clear()
      this.vcr.createEmbeddedView(this.resetpass)
  if (!this.otpCodeValue || this.otpCodeValue.length < this.otpArray.length) {
    this.toastr.show('رجاء إدخال رمز التحقق بالكامل', 'error');
    return;
  }

  let data = {
    email: this.emailForm.get('email')?.value,
    otpCode: this.otpCodeValue
  };

 
}




  onOtpInput(e:any){
      // const input = e.target;
      // let value = input.value;
      // value = value.replace(/[^0-9]/g, '');
      // input.value=value;

      this.otpCodeValue=e;

    //    if (value && index < this.otpArray.length - 1) {
    //   const nextInput = this.otpInputs.toArray()[index + 1].nativeElement;
    //   nextInput.focus();
    // }



  }







  ngOnDestroy(): void {
    if(this.scription){
      this.scription.unsubscribe();
    }
  
      
  }
}
