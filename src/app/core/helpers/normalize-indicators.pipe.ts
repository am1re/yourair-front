import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeIndicators'
})
export class NormalizeIndicatorsPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value?.toFixed(1).replace(/\.?0*$/, '');
  }

}
