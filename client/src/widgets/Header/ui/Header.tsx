import {
  BurgerButton,
  BurgerMenu,
  BurgerMenuContent,
} from '../../../features/BurgerMenu';
import { Navigation } from './Navigation';
import { HeaderActions } from './HeaderActions';

export const Header = () => {
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
          <BurgerMenuContent />
        </BurgerMenu>

        <BurgerButton />
      </section>
    </header>
  );
};
