import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const pass = formGroup.get(password);
    const confpass = formGroup.get(confirmPassword);

    if (!pass || !confpass) {
      return null;
    }

    if (confpass.errors && !confpass.errors['passwordMismatch']) {
      return null;
    }

    if (pass.value !== confpass.value) {
      confpass.setErrors({ ...confpass.errors, passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confpass.errors) {
        delete confpass.errors['passwordMismatch'];
        if (Object.keys(confpass.errors).length === 0) {
          confpass.setErrors(null);
        }
      }
      return null;
    }
  };
}
