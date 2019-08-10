import LocalizedStrings from 'react-localization';
import english from 'locales/en/strings';
import spanish from 'locales/es/strings';
import config from 'configuration/config';

class Locales {
  constructor() {
    this.locales = new LocalizedStrings({
      en: english.en,
      es: spanish.es,
    });

    // set default language
    this.locales.setLanguage(config.LOCALES.LANGUAGES.DEFAULT);
  }

  set language(lang) {
    this.locales.setLanguage(lang);
  }

  get language() {
    return this.language.getLanguage();
  }

  get translations() {
    return this.locales;
  }

  translateARoute(route) {
    return route
      .split('.')
      .reduce(
        (object, subpath) => (object && object[subpath] ? object[subpath] : null),
        this.locales,
      );
  }
}

const language = new Locales();

export const translations = language.translations;
