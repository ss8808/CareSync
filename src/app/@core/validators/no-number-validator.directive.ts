import {Directive, ElementRef, HostListener} from '@angular/core';
import {NG_VALIDATORS, FormControl, Validator} from '@angular/forms';
import {ObjectUtil} from '../utils/object-util';

@Directive({
  selector: '[appNoNumberValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoNumberValidatorDirective,
      multi: true
    }
  ]
})
export class NoNumberValidatorDirective {

  private regex: RegExp = new RegExp(/^[^0-9]*$/);

  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Delete'
  ];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow special keys and combinations with Ctrl (e.g., Ctrl+C, Ctrl+V)
    if (
      this.specialKeys.includes(event.key) ||
      (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase()))
    ) {
      return;
    }

    // Prevent default if the key is a number
    if (!event.key.match(/[^0-9]/)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedInput: string = event.clipboardData
      ? event.clipboardData.getData('text')
      : '';

    // Prevent paste if it contains any numeric characters
    if (!pastedInput.match(this.regex)) {
      event.preventDefault();
    }
  }

}
