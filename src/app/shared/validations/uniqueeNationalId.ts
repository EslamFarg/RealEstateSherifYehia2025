import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueNationalIDValidator(existingIDs: string[], currentID?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) return null;

    // لو الرقم موجود بالفعل في القائمة لكنه ليس الهوية الحالية عند التعديل
    if (existingIDs.includes(value) && value !== currentID) {
      return { nationalIDNotUnique: 'رقم الهوية مستخدم بالفعل' };
    }

    return null;
  };
}
