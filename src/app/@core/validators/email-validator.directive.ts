import {Directive} from '@angular/core';
import {NG_VALIDATORS, FormControl, Validator} from '@angular/forms';
import {ObjectUtil} from '../utils/object-util';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator {
  
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  validate(control: FormControl): { [key: string]: any } | null {

    if (ObjectUtil.isEmpty(control?.value)) return null;

    const isValid = this.emailRegex.test(control?.value);

    return isValid ? null : {'invalidEmail': true};
  }

}
