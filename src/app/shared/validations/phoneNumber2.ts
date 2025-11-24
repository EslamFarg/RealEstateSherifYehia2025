import { AbstractControl, ValidationErrors } from '@angular/forms';


export function ksaEgyptPhoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return { required: true };

  // Ensure value is an object with phone fields
  if (typeof value !== 'object' || !value.e164Number || !value.countryCode) {
    return { invalidPhone: 'رقم الجوال غير صالح' };
  }

  const phone = value.e164Number;
  const country = value.countryCode;

  const ksaPattern = /^\+9665[0-9]{8}$/;
  const egyptPattern = /^\+201[0125][0-9]{8}$/;

  if (country === 'SA' && !ksaPattern.test(phone)) {
    return { invalidPhone: 'رقم سعودي غير صالح' };
  }

  if (country === 'EG' && !egyptPattern.test(phone)) {
    return { invalidPhone: 'رقم مصري غير صالح' };
  }

  return null;
}



