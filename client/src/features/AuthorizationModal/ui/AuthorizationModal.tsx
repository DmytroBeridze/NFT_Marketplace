import { Icon } from '../../../shared/ui/atoms/Icon';
import { useToggleOverlay } from '../../../shared/ui/molecules/Overlay';
import { useTranslate } from '../../../shared/lib/i18n';
import { type MouseEvent } from 'react';
import { AuthorizationForms } from './AuthorizationForms';
import { Text } from '../../../shared/ui/atoms/Text';
import { useAuthorizationContext } from '../context';

type FormsName = 'login' | 'signUp';

export const AuthorizationModal = () => {
  const { setTab, tab } = useAuthorizationContext();

  const { closeHandler } = useToggleOverlay();
  const { translateVariables } = useTranslate({
    translateKey: 'modal.tabs',
    returnObjects: true,
  });
  const buttonsNames = Object.entries(translateVariables);

  const tabHandler = (e: MouseEvent<HTMLLIElement>, name: FormsName) => {
    e.stopPropagation();
    setTab(name);
  };

  return (
    <section className="relative w-full max-w-150 overflow-y-auto max-h-[90vh] ">
      <div className="flex justify-end sticky  -top-8">
        <Icon
          className="cursor-pointer"
          style={{ color: 'white' }}
          onClick={() => closeHandler()}
          name="close-icon"
          // fill="black"
        />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-static-surface rounded-lg border "
      >
        <ul className="w-full  flex justify-between">
          {buttonsNames.map(([key, value]: [string, string], i) => {
            return (
              <li
                key={key}
                className={`flex justify-center 
                items-center basis-1/2 px-5 py-6
                cursor-pointer  ${i === 1 ? 'rounded-tr-lg' : 'rounded-tl-lg'}
                ${tab === key ? 'bg-static-surface' : 'bg-tab-active-background-color'}
                duration-200 ease-in-out
                
                `}
                onClick={(e) => {
                  tabHandler(e, key as FormsName);
                }}
              >
                <Text
                  size="responsive-size-sm"
                  color={`${tab === key ? 'static-text-black-color' : 'static-text-white-color'}`}
                  // color="static-text-black-color"
                  font="font-work-sans-semibold"
                >
                  {value}
                </Text>
              </li>
            );
          })}
        </ul>

        <AuthorizationForms name={tab} />
      </div>
    </section>
  );
};
