import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'choreTemplateCreator'
})
export class ChoreTemplateCreatorPipe implements PipeTransform {

  transform(items: any[], creatorId: String): any[] {
    if (!items) return [];
    if (!creatorId) return items;
  
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return item[key] === creatorId;
      });
    });
   }
}
