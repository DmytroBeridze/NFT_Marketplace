import { LangSwitcher } from '../../../features/LangSwitcher';
import { ThemeSwitcher } from '../../../features/ThemeSwitcher';
import { Button } from '../../../shared/ui/atoms/Button';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { Text } from '../../../shared/ui/atoms/Text';
import { useTranslation } from 'react-i18next';

export const BurgerActions = () => {
  const { t } = useTranslation();

  return (
    <section
      className="flex flex-col navigation-responsive 
         max-w-full relative  before:content-[''] before:absolute 
         before:-top-6 before:left-0 before:w-full before:h-0.5 
          before:bg-white/20"
    >
      <div
        onClick={() => console.log('Click')}
        className="ease-in-out duration-300 
      flex flex-col sm:flex-row  sm:items-center gap-2.5 justify-between py-4 px-4 bg-burger-hover-background-color 
      rounded-lg cursor-pointer w-full"
      >
        <Button
          variant="secondary"
          className="py-3 px-6  lg:py-5 lg:px-7 flex gap-3 items-center whitespace-nowrap  "
          // onClick={() => console.log('Click')}
        >
          <Icon name="user-icon" size={14} className="lg:w-5 lg:h-5" />
          <Text
            Element="p"
            font="font-work-sans-semibold"
            size="responsive-size-sm"
            color="text-inversive-text-color"
          >
            {t('button.signIn')}
          </Text>
        </Button>
        <div className="hidden sm:block">
          <ThemeSwitcher bgColor="bg-static-primary-background-color" />
        </div>
      </div>

      {/* <div className="ease-in-out duration-300 sm:hidden  flex items-center py-6 px-4 bg-burger-hover-background-color rounded-lg cursor-pointer w-full"> */}
      <div className="sm:hidden  flex items-center ">
        <ThemeSwitcher bgColor="bg-static-primary-background-color" />
      </div>
      <div>
        {/* <div className="ease-in-out duration-300 flex items-center py-6 px-4 bg-burger-hover-background-color rounded-lg cursor-pointer w-full"> */}
        <LangSwitcher className="w-18" />
      </div>
    </section>
  );
};
