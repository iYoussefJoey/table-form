import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {}

  transform(value:string):string {
    return this.translationService.get(value);
  }

}
