import { AbstractControl } from "@angular/forms";

export class CheckEmail{

    static ValidationEmail(){
        return (control:AbstractControl)=>{
            const value=control.value;
              if(!value) return null;
            const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

          

            if(regex.test(value)){
                return null
            }else{
                return {inValidEmail:'رجاء كتابه الايميل بشكل صحيح'}
            }

        }
    }
}