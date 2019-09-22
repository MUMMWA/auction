import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(str: string, length): string {
    const modifiedStr = str.substring(0, length);
    return `${modifiedStr} ...`;
  }

}
