import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter',
  standalone: true
})
export class CurrencyFormatterPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    // use this if nepali formatter is need
        const result = value.toString().split('.');
        let lastThree = result[0].substring(result[0].length - 3);
        const otherNumbers = result[0].substring(0, result[0].length - 3);
        if (otherNumbers !== '' && otherNumbers !== '-') {
            lastThree = ',' + lastThree;
        }
        let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

        if (result.length > 1) {
            output += '.' + result[1];
        }
        return output;
  }

}
