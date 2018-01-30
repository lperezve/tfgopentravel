import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterNombre'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.nombre.toLowerCase().includes(searchText);
    });
   }
}