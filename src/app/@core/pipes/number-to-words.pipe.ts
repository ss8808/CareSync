import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWords',
  standalone: true
})
export class NumberToWordsPipe implements PipeTransform {

  private ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  private teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  private tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  private thousands = ['', 'thousand', 'million', 'billion', 'trillion'];

  transform(value: number): string {
    if (!value) return 'Zero';
    let words = this.convertNumberToWords(value);
    return this.capitalizeFirstLetter(words);
  }

  private convertNumberToWords(num: number): string {
    if (num === 0) return 'zero';

    let word = '';
    let index = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        word = this.getWord(num % 1000, index) + word;
      }
      num = Math.floor(num / 1000);
      index++;
    }

    return word.trim();
  }

  private getWord(n: number, index: number): string {
    if (n === 0) return '';
    if (n < 10) return this.ones[n] + ' ' + this.thousands[index] + ' ';
    if (n < 20) return this.teens[n - 11] + ' ' + this.thousands[index] + ' ';
    if (n < 100) return this.tens[Math.floor(n / 10)] + ' ' + this.ones[n % 10] + ' ' + this.thousands[index] + ' ';
    return this.ones[Math.floor(n / 100)] + ' hundred ' + this.getWord(n % 100, 0) + this.thousands[index] + ' ';
  }

  private capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
