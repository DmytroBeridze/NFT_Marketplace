import {
  BurgerActions,
  BurgerButton,
  BurgerMenu,
} from '../../../features/BurgerMenu';
import { Navigation } from './Navigation';
import { HeaderActions } from './HeaderActions';
import { NavigationPanel } from '../../../features/navigation';
import { Text } from '../../../shared/ui/atoms/Text';
import { HeaderLogo } from './HeaderLogo';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { closed } from '../../../features/BurgerMenu/model/burgerSlice';
import { useAppDispatch } from '../../../app/store/reduxHooks';
import { LogoVariantContext } from '../context/LogoVariantContext ';

export const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header
      className="
        max-w-full
        bg-primary-background-color
        text-primary-text-color
        py-5
        px-5
        "
    >
      <section className="  my-0 mx-auto flex items-center justify-between max-w-[1180px]">
        <Navigation />
        <HeaderActions />

        <BurgerMenu>
          {/* смена цвета иконки лого в бургере */}
          <LogoVariantContext.Provider value="burger">
            <HeaderLogo className="px-4" />
          </LogoVariantContext.Provider>
          <Icon
            name="close-icon"
            style={{ color: 'white' }}
            className="absolute right-10 top-11 cursor-pointer"
            onClick={() => dispatch(closed())}
          />
          <NavigationPanel
            classNameList="flex flex-col  justify-center gap-nav-responsive  navigation-responsive"
            classNameItem="ease-in-out duration-300 flex items-center py-6 px-4 bg-burger-hover-background-color rounded-lg cursor-pointer"
            // classNameItem="relative after:absolute after:left-0  after:bottom-[-2px] after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease  hover:after:scale-x-100 link-underline-burger"
            renderItem={(value, lang) => (
              <Text
                size="responsive-size-md"
                font="font-work-sans-semibold"
                color="text-burger-color"
                Element="span"
                className={`leading-normal ${lang === 'ua' ? 'lang-ua' : ''}  `}
              >
                {value}
              </Text>
            )}
          />

          <BurgerActions />
        </BurgerMenu>

        <BurgerButton />
      </section>
    </header>
  );
};
