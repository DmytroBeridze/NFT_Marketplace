import i18n from 'i18next';
export const useLanguage = () => {
  const lang = i18n.language;

  const changeLang = () => {
    i18n.changeLanguage(lang === 'ua' ? 'en' : 'ua');
  };

  return { lang, changeLang };
};
