import { useEffect, useState } from 'react';
import { useLanguage } from '../../shared/lib/i18n';
import { LangSelect } from '../../shared/ui/atoms/LangSelect';

const languages = [
  { id: 'ua', name: 'Ua' },
  { id: 'en', name: 'En' },
];

export const LangSwitcher = () => {
  const { language, changeLang } = useLanguage();
  const initialLang =
    languages.find((elem) => elem.id === language) || languages[0];

  const [selectedLang, setSelectedLang] = useState(initialLang);

  useEffect(() => {
    changeLang(selectedLang.id);
  }, [selectedLang, changeLang]);

  return (
    <LangSelect
      language={language}
      languages={languages}
      selectedLang={selectedLang}
      setSelectedLang={setSelectedLang}
    ></LangSelect>
  );
};
