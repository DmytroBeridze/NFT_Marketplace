import { NavLink } from 'react-router-dom';
import type { NavigationPanelItemProps } from '../types/navigation';
import type { Dispatch } from '@reduxjs/toolkit';
import { useContext, type SetStateAction } from 'react';
import { LogoVariantContext } from '../../../shared/ui/molecules/HeaderLogo';
import { useAppDispatch } from '../../../app/store/reduxHooks';
import { closed } from '../../BurgerMenu/model/burgerSlice';
import { Text } from '../../../shared/ui/atoms';

export const NavigationPanelItem = ({
  routeKey,
  lang,
  value,
  classNameItem,
  renderItem,
}: NavigationPanelItemProps) => {
  const type = useContext(LogoVariantContext);
  const dispatch = useAppDispatch();

  const isRoot = routeKey === 'marketplace';
  return (
    <li>
      <NavLink
        to={isRoot ? '/' : `${routeKey}`}
        // to={`/${routeKey}`}
        end
        // className={({ isActive }) => {
        // рамка тільки для бургера
        //   const borderClass =
        //     type === 'burger' && isActive
        //       ? 'border-theme-accent'
        //       : 'border-transparent';

        //   return ` border-2  ${classNameItem} ${
        //     isActive
        //       ? `static-text-purple-color `
        //       : 'text-primary-text-color border-transparent'
        //   } ${borderClass}`;
        // }}
        className={({ isActive }) => {
          return ` border-2  ${classNameItem} ${
            isActive
              ? `static-text-purple-color
             ${type === 'burger' ? 'border-theme-accent' : 'border-transparent'}`
              : 'text-primary-text-color border-transparent'
          }`;
        }}
        onClick={() => dispatch(closed())}
      >
        {/* рендер пропс. если он передан, то рендерится он, а не
              тот компонент, который в коде */}
        {({ isActive }) =>
          renderItem ? (
            renderItem(value, lang, isActive)
          ) : (
            <Text
              size="responsive-size-sm"
              font="font-work-sans-semibold"
              Element="span"
              className={`leading-normal ${lang === 'ua' ? 'lang-ua' : ''} hover:opacity-60 `}
            >
              {value}
            </Text>
          )
        }
      </NavLink>
    </li>
  );
};
