import type { IconName } from '../../../shared/lib/icons';
import { useTheme } from '../../../shared/lib/theme/useTheme';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { useToggleOverlay } from '../../../shared/ui/molecules/Overlay';
import { useCloseBurgerMenu } from '../lib/useCloseBurgerMenu';

interface BurgerButtonProps {
  iconName?: IconName;
}

export const BurgerButton = ({
  iconName = 'BurgerMenu-icon',
}: BurgerButtonProps) => {
  const { theme } = useTheme();
  const { openBurger } = useCloseBurgerMenu();
  const { openHandler } = useToggleOverlay();

  const open = () => {
    openBurger();
    // openHandler('burgerMenu');
  };

  return (
    <div
      onClick={open}
      className="burger-button-responsive cursor-pointer"
      aria-label="Toggle burger menu"
    >
      <Icon
        name={iconName}
        size={24}
        fill={theme === 'light' ? 'black ' : 'white'}
      />
    </div>
  );
};
