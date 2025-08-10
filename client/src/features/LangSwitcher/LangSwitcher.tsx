import { useEffect, useState } from 'react';
import { useLanguage } from '../../shared/lib/i18n';
import { LangSelect } from '../../shared/ui/atoms/LangSelect';

const languages = [
  { id: 'ua', name: 'Ua' },
  { id: 'en', name: 'En' },
];

interface LangSwitcherProps {
  className?: string;
}
export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { language, changeLang } = useLanguage();

  const initialLang =
    languages.find((elem) => elem.id === language) || languages[0];

  const [selectedLang, setSelectedLang] = useState(initialLang);

  // обновление selectedLang в зависимости от изменений в i18n
  // иначе не изменяется значок языка в неактивном переключателе языка если их несколько
  // так как у каждого переключателя свой стейт selectedLang
  useEffect(() => {
    const newLang = languages.find((elem) => elem.id === language);
    if (newLang && newLang.id !== selectedLang.id) {
      setSelectedLang(newLang);
    }
  }, [language]);

  useEffect(() => {
    changeLang(selectedLang.id);
  }, [selectedLang]);

  return (
    <LangSelect
      language={language}
      languages={languages}
      selectedLang={selectedLang}
      setSelectedLang={setSelectedLang}
      className={className}
    ></LangSelect>
  );
};
