import type { IconName } from '../../../shared/lib/icons';
import { useTheme } from '../../../shared/lib/theme/useTheme';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { useCloseBurgerMenu } from '../lib/useCloseBurgerMenu';

interface BurgerButtonProps {
  iconName?: IconName;
}

export const BurgerButton = ({
  iconName = 'BurgerMenu-icon',
}: BurgerButtonProps) => {
  const { theme } = useTheme();
  const { openBurger } = useCloseBurgerMenu();

  return (
    <div
      onClick={openBurger}
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
