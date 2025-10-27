import { AbstractControl, ValidationErrors } from "@angular/forms"

export class checkUsername {

    title:any
   static ValidationUsername(){
    return (control:AbstractControl):any =>{
        const value=control.value;
        const regex=/^[\u0621-\u064A A-Za-z0-9._]{2,50}(?:\.[\u0621-\u064A A-Za-z0-9._]{2,50})*$/
    
        if(!value) return null;


        // if (regex.test(value) || !value.startWith(/^[0-9]$/)){
        //     return null;
        // }else{
        //     return {invalidUsername:true}
        // }

          // لو الصيغة العامة غلط → مرفوض
      if (!regex.test(value)) {
        return { invalidUsername: " اسم المستخدم يحتوي على رموز أو حروف غير مسموح بها." };
      }

        const firstChar = value.charAt(0);
      const startsWithLetterOrNumber = /^[0-9]$/.test(firstChar);

      if (startsWithLetterOrNumber) {
        return { invalidStart: ' اسم المستخدم لا يجب أن يبدأ  برقم.' };
      }

      return null;

        
    }
   }

}