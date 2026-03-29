import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import deTranslations from '../locales/de.json';
import enTranslations from '../locales/en.json';
import frTranslations from '../locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: deTranslations },
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
    },
    fallbackLng: 'de',
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    }
  });

export default i18n;
