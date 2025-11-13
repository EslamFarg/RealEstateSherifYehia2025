import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PhoneValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const valObj = control.value;

    // الرقم الدولي الكامل مع الكود المختار تلقائيًا
    const value: string = typeof valObj === 'string' 
      ? valObj 
      : valObj?.internationalNumber;

    if (!value) return null;

    // إزالة أي فراغات
    const trimmed = value.replace(/\s+/g, '');

    // حساب الطول: + تحسب كرقمين
    let digitsOnly = trimmed.replace(/\D/g, '');
    if (trimmed.startsWith('+')) {
      digitsOnly = '00' + digitsOnly.slice(1);
    }

    const maxLength = 14;
    if (digitsOnly.length > maxLength) {
      return { maxLengthExceeded: 'رقم الجوال طويل جدًا بما في ذلك كود الدولة' };
    }

    // Regex يتحقق من السعودية ومصر
    const regex = /^(?:\+966|00966|05)\d{8}$|^(?:\+20|0020|01)\d{8}$/;
    return regex.test(trimmed)
      ? null
      : { invalidPhone: 'رقم الجوال يجب أن يكون سعودي أو مصري وصحيح.' };
  }
}
