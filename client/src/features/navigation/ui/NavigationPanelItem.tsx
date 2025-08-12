import { NavLink } from 'react-router-dom';
import { Text } from '../../../shared/ui/atoms/Text';
import type { NavigationPanelItemProps } from '../types/navigation';

export const NavigationPanelItem = ({
  routeKey,
  lang,
  value,
  classNameItem,
  renderItem,
}: NavigationPanelItemProps) => {
  return (
    <li>
      <NavLink to={`/${routeKey}`} className={classNameItem}>
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
};
