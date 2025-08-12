import { useTranslation } from 'react-i18next';
import { Icon } from '../../shared/ui/atoms/Icon';
import { useToggleOverlay } from '../../shared/ui/molecules/Overlay';

export const AuthorizationModal = () => {
  const { closeHandler } = useToggleOverlay();
  const { t } = useTranslation();
  const translateVariablesObj = t('modal', { returnObjects: true });
  const buttonsNames = Object.entries(translateVariablesObj);

  return (
    <>
      <div className="relative w-full h-full  max-w-150 max-h-120 bg-static-surface rounded-lg">
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
                className={`flex justify-center items-center basis-1/2 p-5 cursor-pointer  ${i === 1 ? 'rounded-tr-lg' : 'rounded-tl-lg'} bg-amber-200`}
                onClick={() => console.log('click')}
              >
                {value}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
