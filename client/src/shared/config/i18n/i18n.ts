// /src/shared/config/i18n/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const namespaces = [
  // Список namespace, которые должны быть загружены сразу.
  // При добавлении нового файла переводов не забудь добавить его сюда.

  'heroContent',
  'translation',
  'dashboard',
  'browseCategories',
  'connectionWallet',
  'discountedWork',
  'discoverMoreNFTs',
  'footer',
  'notFoundPage',
  'howItWorks',
  'topCreators',
  'trendingCollection',
  'walletInstallModal',
  'weeklyDigest',
];

// Инициализация i18n
i18n
  .use(HttpBackend) // Позволяет загружать переводы из внешних файлов (например, из public)
  .use(initReactI18next) // Интеграция с React
  .use(LanguageDetector)
  .init({
    // lng: 'en', // Язык по умолчанию
    fallbackLng: 'en', // Запасной язык, если ключ не найден
    ns: namespaces, // namespaces
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
