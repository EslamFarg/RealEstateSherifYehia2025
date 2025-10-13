import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordStrengthValidator {
  static strong(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    const errors: any = {};

    if (!minLength.test(value)) {
      errors.minLength = 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
    }
    if (!hasUpperCase.test(value)) {
      errors.upperCase = 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل';
    }
    if (!hasLowerCase.test(value)) {
      errors.lowerCase = 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل';
    }
    if (!hasNumber.test(value)) {
      errors.number = 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل';
    }
    if (!hasSpecialChar.test(value)) {
      errors.specialChar = 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل مثل (!@#$%)';
    }

    return Object.keys(errors).length ? errors : null;
  }
}
