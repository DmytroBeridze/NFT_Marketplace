import { Icon } from '../../../shared/ui/atoms/Icon';
import { useToggleOverlay } from '../../../shared/ui/molecules/Overlay';
import { useTranslate } from '../../../shared/lib/i18n';
import { useState, type MouseEvent } from 'react';
import { AuthorizationForms } from './AuthorizationForms';

type FormsName = 'login' | 'signUp';

export const AuthorizationModal = () => {
  const { closeHandler } = useToggleOverlay();
  const { translateVariables } = useTranslate({
    translateKey: 'modal.tabs',
    returnObjects: true,
  });
  const buttonsNames = Object.entries(translateVariables);

  const [tab, setTab] = useState<FormsName>('login');

  const tabHandler = (e: MouseEvent<HTMLLIElement>, name: FormsName) => {
    e.stopPropagation();
    setTab(name);
  };

  return (
    <section className="relative w-full h-full  max-w-150 max-h-120 bg-static-surface rounded-lg">
      <Icon
        className="absolute right-0 -top-8 cursor-pointer"
        style={{ color: 'white' }}
        onClick={() => closeHandler()}
        name="close-icon"
        fill="white"
      />

      <ul className="w-full  flex justify-between">
        {buttonsNames.map(([key, value]: [string, string], i) => {
          return (
            <li
              key={key}
              className={`flex justify-center 
                  items-center basis-1/2 p-5
                   cursor-pointer  ${i === 1 ? 'rounded-tr-lg' : 'rounded-tl-lg'}
                   ${tab === key ? 'bg-static-surface' : 'bg-tab-active-background-color'}
                    duration-400 ease-in-out
                   `}
              onClick={(e) => {
                tabHandler(e, key as FormsName);
              }}
            >
              {value}
            </li>
          );
        })}
      </ul>

      <AuthorizationForms name={tab} />
    </section>
  );
};
