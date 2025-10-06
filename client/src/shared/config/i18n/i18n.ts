// /src/shared/config/i18n/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Инициализация i18n
i18n
  .use(HttpBackend) // Позволяет загружать переводы из внешних файлов (например, из public)
  .use(initReactI18next) // Интеграция с React
  .use(LanguageDetector)
  .init({
    // lng: 'en', // Язык по умолчанию
    fallbackLng: 'en', // Запасной язык, если ключ не найден
    ns: ['heroContent', 'translation'],
    backend: {
      // Шаблон пути, откуда загружаются переводы
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // loadPath: '/locales/{{lng}}/translation.json',
    },

    interpolation: {
      escapeValue: false, // Не нужно экранировать, если используем React
    },
  });

export default i18n;
