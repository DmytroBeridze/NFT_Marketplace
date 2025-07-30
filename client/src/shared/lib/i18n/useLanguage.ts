import i18n from 'i18next';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const lang = i18n.language;

  const [language, setLanguage] = useState(lang);

  const changeLang = (newLang?: string) => {
    const ln = newLang || (language === 'ua' ? 'en' : 'ua');

    i18n.changeLanguage(ln);
  };
  useEffect(() => {
    const changeLang = (val: string) => {
      setLanguage(val);
    };
    i18n.on('languageChanged', changeLang);
    return () => i18n.off('languageChanged', changeLang);
  }, []);

  return { language, changeLang };
};
