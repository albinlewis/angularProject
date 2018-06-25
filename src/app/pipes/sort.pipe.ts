import { Pipe, PipeTransform } from '@angular/core';

/**
 * Sort elements by their name attribute
 */

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if(!value) return [];
    return value.sort((a,b) => {
      if(a.name < b.name) return -1;
      else if(a.name > b.name) return 1;
      else return 0;
    });
  }

}
