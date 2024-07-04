
import { Validators, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static required = Validators.required;

  static pattern(regex: RegExp): ValidatorFn {
    return Validators.pattern(regex);
  }

  static mobileNumberPattern(countryCode: string): ValidatorFn {
    const patterns: { [key: string]: RegExp } = {
      'IN': /^[0-9]{10}$/,
      'DE': /^[0-9]{10,11}$/
    };
    return Validators.pattern(patterns[countryCode]);
  }

  static pinCodePattern(countryCode: string): ValidatorFn {
    const patterns: { [key: string]: RegExp } = {
      'IN': /^[0-9]{6}$/,
      'DE': /^[0-9]{5,8}$/
    };
    return Validators.pattern(patterns[countryCode]);
  }
}

