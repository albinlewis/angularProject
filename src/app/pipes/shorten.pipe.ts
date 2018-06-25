import { Pipe, PipeTransform } from '@angular/core';

/**
 * Shorten text if longer than 400 symbols
 */
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   return value.substr(0, 400) + '...';
  }

}
