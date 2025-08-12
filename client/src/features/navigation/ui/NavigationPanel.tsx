import type { NavigationPanelProps, NavItemTuple } from '../types/navigation';
import { NavigationPanelItem } from './NavigationPanelItem';

export const NavigationPanel = ({
  classNameList,
  classNameItem,
  renderItem,
  navItems,
  lang,
}: NavigationPanelProps) => {
  return (
    <ul className={classNameList}>
      {navItems.map(([key, value]: NavItemTuple) => {
        return (
          <NavigationPanelItem
            key={key}
            routeKey={key}
            lang={lang}
            value={value}
            classNameItem={classNameItem}
            renderItem={renderItem}
          />
        );
      })}
    </ul>
  );
};
