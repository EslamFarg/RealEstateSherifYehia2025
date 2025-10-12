import { AbstractControl, ValidationErrors } from "@angular/forms"

export class checkUsername {

    title:any
   static ValidationUsername(){
    return (control:AbstractControl):any =>{
        const value=control.value;
        const regex=/^[A-Za-z0-9._]+$/
    
        if(!value) return null;


        if (regex.test(value)){
            return null;
        }else{
            return {invalidUsername:true}
        }

        
    }
   }

}