import { Component, DestroyRef, ElementRef, inject, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from '../../shared/ui/toastr/services/toastr.service';
import { checkUsername } from '../../shared/validations/checkUsername';
import { AuthService } from './services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthLogin } from './models/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {



  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Services!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111
  fb:FormBuilder=inject(FormBuilder);
  router:Router=inject(Router)
  scription!:Subscription;
  toastr:ToastrService=inject(ToastrService)
  _authServices:AuthService=inject(AuthService)
  destroyRef=inject(DestroyRef);



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 Property
  otpCodeValue:any
  counter=180;
  remember:any=true;
  @ViewChild('login',{read:TemplateRef}) login!:TemplateRef<any>;
  @ViewChild('otpcodetem',{read:TemplateRef}) otpcodetem!:TemplateRef<any>;
  @ViewChild('container',{read:ViewContainerRef}) vcr!:ViewContainerRef

  @ViewChild('resetpassword',{read:TemplateRef}) resetpass!:TemplateRef<any>;
  @ViewChild('emailForgot',{read:TemplateRef}) emailForgot!:TemplateRef<any>;

  passwordForm: any;
  showNewPassword = false;
  showConfirmPassword = false;
  emailOtp:any


    
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
    emailOrUserName:[JSON.parse(localStorage.getItem('rememberData')!)?.emailOrUserName ||'',[Validators.required,Validators.minLength(3),checkUsername.ValidationUsername()]],
    password:[JSON.parse(localStorage.getItem('rememberData')!)?.password || '',Validators.required]
  })


  otpForm=this.fb.group({
   
  email:[''  , Validators.required] ,
  otp: ['',Validators.required]

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

  

    
 if(this.authForm.valid){
      const data={
        emailOrUserName:this.authForm.value.emailOrUserName,
        password:this.authForm.value.password
      }

      this._authServices.authLogin(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{

        let payloadUser={
          userId:res.userId,
          fullName:res.fullName,
          email:res.email,
          imgUrl:res.imgUrl,
          phoneNumber:res.phoneNumber,
          token:res.token
        }

        this.router.navigate(['/dashboard'])

        localStorage.setItem('payloadUser',JSON.stringify(payloadUser));  
        console.log(payloadUser);

        if(this.remember) {
          localStorage.setItem('rememberData',JSON.stringify({
            emailOrUserName:data.emailOrUserName,
            password:data.password
          }));
        }else{
          localStorage.removeItem('rememberData');
        }

        this.toastr.show('تم تسجيل الدخول بنجاح','success')
        this.authForm.reset();



      })





    
    }else{
      this.authForm.markAllAsTouched();
    }
    
   

  }


  showreset:any=false;
  showemail:any

  sendOtpCode(){

    
    if(this.emailForm.valid){
      let data={
        email:this.emailForm.value.email
      }
      

      this._authServices.sendEmailInotp(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res:any)=>{
        this.vcr.clear();
       this.vcr.createEmbeddedView(this.otpcodetem);
        this.toastr.show('تم ارسال رمز التحقق','success');  
        this.emailOtp=data.email  
      })
 
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


onSubmitOTP() {

  console.log('OTOTOTOTTOTOTOTO')

  if (!this.otpCodeValue || this.otpCodeValue.length < this.otpArray.length) {
    this.toastr.show('رجاء إدخال رمز التحقق بالكامل', 'error');
    return;
  }

    let data ={
  email: this.emailOtp,
  otp: this.otpForm.value.otp
}  

console.log(data)


  // if(this.otpForm.valid){

this._authServices.sendOtp(data)
  .pipe(takeUntilDestroyed(this.destroyRef))
  .subscribe({
    next: (res:any) => {
      console.log('OTP Response:', res);
      this.vcr.clear();
      this.vcr.createEmbeddedView(this.resetpass);
      this.toastr.show('تم التحقق بنجاح','success');
    },
    error: (err:any) => {
      console.error('OTP Error:', err);
      this.toastr.show('حدث خطأ أثناء التحقق','error');
    }
  });


  // }else{
    
  // }
 



 
}




  onOtpInput(value:any){
    

      this.otpCodeValue=value;
        this.otpForm.get('otp')?.setValue(value);

   
      console.log(this.otpCodeValue);


  }





  

  rememberme(){
    this.remember=!this.remember;

    console.log(this.remember)
  }



  logs(){
    console.log('clicked')
  }

}
