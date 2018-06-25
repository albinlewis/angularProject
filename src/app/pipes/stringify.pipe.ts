import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generate string output for analysis results
 */
@Pipe({
  name: 'stringify'
})
export class StringifyPipe implements PipeTransform {

  transform(value: any[], args?: any): String {
    if(!value) return "";

    let content = "Analysis Result\n";
    value.forEach(val => {
      let name = val.disease_id ? val.disease_id.name : "No disease";
      content += `${name} => ${val.confidence * 100}%\n`;
    });
    return content;
  }

}
