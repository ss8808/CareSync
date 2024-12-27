import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {
  private regex: RegExp = new RegExp(/^[0-9]*$/);

  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
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

    // Prevent default if the key is not a number
    if (!event?.key?.match(/^[0-9]$/)) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const pastedInput: string = event.clipboardData
      ? event.clipboardData.getData('text')
      : '';

    if (!pastedInput.match(this.regex)) {
      event.preventDefault();
    }
  }
}
