import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeQuotes',
  standalone: true,
})
export class RemoveQuotesPipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value === 'string') {
      return value.replace(/"/g, '');
    }
    return value;
  }

}
