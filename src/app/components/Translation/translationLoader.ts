import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { TranslationService } from '../../services/translation.service';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private translationService: TranslationService) {}

  getTranslation(lang: string): Observable<any> {
    return of(this.translationService.get(lang));
  }
}
