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
          <li
            key={key}
            style={{ paddingTop: '2px' }}
            className="relative after:absolute after:left-0  after:bottom-[-2px] after:h-0.5 after:w-full link-underline after:origin-center after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease  hover:after:scale-x-100 "
            // className="relative after:absolute after:left-0  after:bottom-[-2px] after:h-0.5 after:w-full  after:bg-primary-accent-color after:origin-center after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease-in  hover:after:scale-x-100 "
          >
            <NavLink to={`/${key}`}>
              <Text
                size="t-text-sm"
                font="font-work-sans-semibold"
                Element="span"
                className={`leading-normal ${lang === 'ua' ? 'lang-ua' : ''} hover:opacity-60`}
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
