import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from './components/Translation/translationLoader';
import { TranslationService } from './services/translation.service';
export function provideTranslateModule() {
  return TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useClass: CustomTranslateLoader,
      deps: [TranslationService],
    },
  }).providers || [];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    ...provideTranslateModule(),
  ],
};
