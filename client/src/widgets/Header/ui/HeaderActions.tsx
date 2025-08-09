import { useAppDispatch } from '../../../app/store/reduxHooks';
import { toggle } from '../../../features/AuthorizationModal';
import { useToggleAuthorizationModal } from '../../../features/AuthorizationModal/hooks/useToggleAuthorizationModal';
import { LangSwitcher } from '../../../features/LangSwitcher';
import { ThemeSwitcher } from '../../../features/ThemeSwitcher';
import { Button } from '../../../shared/ui/atoms/Button';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { Text } from '../../../shared/ui/atoms/Text';
import { useTranslation } from 'react-i18next';

export const HeaderActions = () => {
  const { t } = useTranslation();
  const { toggleHandler } = useToggleAuthorizationModal();

  return (
    // <section className=" navigation-responsive gap-0.5 items-center ">
    <section className="hidden navigation-responsive gap-0.5 items-center">
      <ThemeSwitcher />
      <LangSwitcher className="py-2 px-2" />
      <Button
        onClick={toggleHandler}
        className="py-3 px-4  lg:py-5 lg:px-7 flex gap-3 items-center whitespace-nowrap "
      >
        <Icon name="user-icon" size={14} className="lg:w-5 lg:h-5 text-white" />
        <Text
          Element="p"
          font="font-work-sans-semibold"
          size="responsive-size-sm"
          color="static-text-white-color"
        >
          {t('button.signIn')}
        </Text>
      </Button>
    </section>
  );
};
