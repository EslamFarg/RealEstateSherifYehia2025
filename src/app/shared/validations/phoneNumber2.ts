import { AbstractControl, ValidationErrors } from '@angular/forms';


export function ksaEgyptPhoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return { required: true };
  if (!value.e164Number) return { invalidPhone: 'رقم الجوال غير صالح' };

  const phone = value.e164Number;   // +9665xxxxxxx or +201xxxxxxxxx
  const country = value.countryCode; // 'sa' or 'eg'

  // KSA pattern (starts with 5 and 9 digits after country code)
  const ksaPattern = /^\+9665[0-9]{8}$/;

  // Egypt mobile pattern (starts with 1 then 0/1/2/5)
  const egyptPattern = /^\+201[0125][0-9]{8}$/;

  if (country === 'sa' && !ksaPattern.test(phone)) {
    return { invalidPhone: 'رقم سعودي غير صالح' };
  }

  if (country === 'eg' && !egyptPattern.test(phone)) {
    return { invalidPhone: 'رقم مصري غير صالح' };
  }

  return null;
}


