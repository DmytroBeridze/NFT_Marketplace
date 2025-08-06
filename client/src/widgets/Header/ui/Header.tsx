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

export const Header = () => {
  // const [toggle, setToggle] = useState(false);

  // const toggleHandler = () => {
  //   setToggle((prevState) => !prevState);

  // };

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
          <HeaderLogo />
          <NavigationPanel
            classNameList="flex flex-col  justify-center gap-nav-responsive  navigation-responsive"
            classNameItem="ease-in-out duration-300 flex items-center py-6 px-4 bg-burger-hover-background-color rounded-lg cursor-pointer"
            // classNameItem="relative after:absolute after:left-0  after:bottom-[-2px] after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease  hover:after:scale-x-100 link-underline-burger"
            renderItem={(value, lang) => (
              <Text
                size="t-text-md"
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
