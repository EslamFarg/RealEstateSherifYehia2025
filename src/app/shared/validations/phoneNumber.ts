import { AbstractControl } from "@angular/forms";



export class saudiPhoneValidator{
    static phoneNumberValidator(control:AbstractControl) :  any{
    



    const value = control.value as string;

    if (!value) return null; // فارغ، يتحكم فيه Validators.required

    // إزالة المسافات والرموز غير الأرقام + علامة +
    const trimmed = value.replace(/\s+/g, '');

    const regexLocal = /^05\d{8}$/;        // تبدأ بـ 05 وطولها 10
    const regexInternational = /^\+9665\d{8}$/; // تبدأ بـ +9665 وطولها 12
    const regexWithoutZero = /^5\d{8}$/;   // تبدأ بـ 5 وطولها 9

    if (regexLocal.test(trimmed) || regexInternational.test(trimmed) || regexWithoutZero.test(trimmed)) {
      return null; // صالح
    }

    return { saudiPhoneInvalid: 'رقم الجوال غير صالح للسعودية' };
  };


       
    
}