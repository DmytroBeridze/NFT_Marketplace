import { useBurgerToggle } from '../../../shared/lib/hooks/useBurgerToggle';
import type { IconName } from '../../../shared/lib/icons';
import { useTheme } from '../../../shared/lib/theme/useTheme';
import { Icon } from '../../../shared/ui/atoms';

interface BurgerButtonProps {
  iconName?: IconName;
}

export const BurgerButton = ({
  iconName = 'BurgerMenu-icon',
}: BurgerButtonProps) => {
  const { theme } = useTheme();

  const { toggleBurgerMenu } = useBurgerToggle();

  return (
    <div
      onClick={toggleBurgerMenu}
      className="burger-button-responsive cursor-pointer "
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
