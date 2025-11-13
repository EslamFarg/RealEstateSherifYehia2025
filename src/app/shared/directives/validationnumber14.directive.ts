import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPhoneValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true }
  ]
})
export class PhoneValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.toString().trim();

    if (!value) return null;

    // ✅ Regex للتحقق من رقم مكون من 14 خانة يبدأ بـ +0 أو 00 أو 0
    const phoneRegex = /^(?:\+0\d{12}|00\d{11}|0\d{13})$/;

    return phoneRegex.test(value) ? null : { invalidPhone: 'رقم الجوال غير صالح' };
  }
}
