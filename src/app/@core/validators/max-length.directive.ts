import {Directive, HostListener, ElementRef, Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appMaxLength]'
})
export class MaxLengthDirective {
  @Input() appMaxLength!: any;

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    if (input.value.length > Number.parseFloat(this.appMaxLength)) {
      input.value = input.value.slice(0, this.appMaxLength);
    }
  }
}
