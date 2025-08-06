import { useTranslation } from 'react-i18next';
import { Text } from '../../../shared/ui/atoms/Text';
import { NavLink } from 'react-router-dom';
import i18n from '../../../shared/config/i18n/i18n';

interface NavigationPanelProps {
  classNameList?: string;
  classNameItem?: string;
  renderItem?: (value: string, lang: string) => React.ReactNode;
}

export const NavigationPanel = ({
  classNameList,
  classNameItem,
  renderItem,
}: NavigationPanelProps) => {
  const { t } = useTranslation();
  const lang = i18n.language;
  const translateVariablesObj = t('nav', { returnObjects: true });
  const navItems = Object.entries(translateVariablesObj);

  return (
    <>
      <ul className={classNameList}>
        {navItems.map(([key, value]: [string, string]) => {
          return (
            <li key={key} className={classNameItem}>
              <NavLink to={`/${key}`}>
                {/* рендер пропс. если он передан, торендерится он, а не 
              тот компонент, который в коде */}
                {renderItem ? (
                  renderItem(value, lang)
                ) : (
                  <Text
                    size="responsive-size-sm"
                    font="font-work-sans-semibold"
                    Element="span"
                    className={`leading-normal ${lang === 'ua' ? 'lang-ua' : ''} hover:opacity-60 `}
                  >
                    {value}
                  </Text>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};
