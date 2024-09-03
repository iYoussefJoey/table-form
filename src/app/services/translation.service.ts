import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: Record<string, Record<string, string>> = {
    en: {
      'HELLO': 'Hello',
      'PLACEHOLDER': 'Placeholder',
      'TOKEN_FOUND': 'Token is FOUND',
      'TOKEN_NOT_FOUND': 'Token is NOT FOUND',
      'NAME_STYLE_LABEL': 'Pick your favorite Name Style',
      'TOKEN_EXPIRES': 'Token Expires Every 15 minutes',
      'CURRENT_DATE': 'Current Date:',
      'TOKEN_EXPIRY_DATE': 'Token Expiry Date:',
      'PRESS_BUTTON_BELOW': 'Press Button Below',
      'GENERATE_TOKEN': 'Generate Token to access page',
      'FIRSTNAME_LASTNAME': 'FirstName, LastName (e.g., Smith, John)',
      'LASTNAME_FIRSTNAME': 'LastName, FirstName (e.g., John, Smith)',
      'letUsKnow': 'Let us know who are you!',
      'switchToEnglish':'Switch to English',
      'switchToPolish':'Switch to Polish',
      'tokenfound':'Token is Found',
      'tokenNotFound':'Token is Not Found'
    },
    pl: {
      'HELLO': 'Cześć',
      'PLACEHOLDER': 'Podpowiedź',
      'TOKEN_FOUND': 'Token znaleziony',
      'TOKEN_NOT_FOUND': 'Token nie znaleziony',
      'NAME_STYLE_LABEL': 'Wybierz swój ulubiony styl imienia',
      'TOKEN_EXPIRES': 'Token wygasa co 15 minut',
      'CURRENT_DATE': 'Bieżąca data:',
      'TOKEN_EXPIRY_DATE': 'Data wygaśnięcia tokenu:',
      'PRESS_BUTTON_BELOW': 'Naciśnij przycisk poniżej',
      'GENERATE_TOKEN': 'Wygeneruj token, aby uzyskać dostęp do strony',
      'FIRSTNAME_LASTNAME': 'Imię, Nazwisko (np. Smith, John)',
      'LASTNAME_FIRSTNAME': 'Nazwisko, Imię (np. John, Smith)',
      'letUsKnow': 'Daj nam znać, kim jesteś!',
      'switchToEnglish':'Zamień na angielski',
      'switchToPolish':'Zamień na polski',
      'tokenfound':'Znaleziono token',
      'tokenNotFound':'Nie znaleziono tokenu'

    },
  };

  private currentLanguage:string = 'en';
  setLanguage(lang: string) {
    this.currentLanguage = lang;
  }

  get(key: string): string {
    return this.translations[this.currentLanguage][key] || key;
  }
}
