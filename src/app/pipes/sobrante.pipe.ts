import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sobrante'
})
export class SobrantePipe implements PipeTransform {

  transform(idproducto, data: any []): unknown {
    for (const d of data) {
      // tslint:disable-next-line: triple-equals
      if (d.idproducto == idproducto){
        return d.cantidad;
      }
    }
    return 0;
  }

}
