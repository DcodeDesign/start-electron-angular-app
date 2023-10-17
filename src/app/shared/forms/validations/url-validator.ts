import { AbstractControl, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = /^(http|https):\/\/[^ "]+$/.test(control.value);
    return isValid ? null : {'invalidUrl': {value: control.value}};
  };
}