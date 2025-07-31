import { useTranslation } from 'react-i18next';
import { Text } from '../../../shared/ui/atoms/Text';
import { NavLink } from 'react-router-dom';
import i18n from '../../../shared/config/i18n/i18n';

export const NavigationPanel = () => {
  const { t } = useTranslation();
  const lang = i18n.language;
  const translateVariablesObj = t('nav', { returnObjects: true });
  const navItems = Object.entries(translateVariablesObj);

  return (
    <ul className="flex gap-12 items-center justify-center ">
      {navItems.map(([key, value]) => {
        return (
          <li key={key} style={{ paddingTop: '2px' }}>
            <NavLink to={`/${key}`}>
              <Text
                size="t-text-sm"
                font="font-work-sans-semibold"
                Element="span"
                className={`leading-normal ${lang === 'ua' ? 'lang-ua' : ''}`}
              >
                {value}
              </Text>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
