import { useAppDispatch } from '../../../app/store/reduxHooks';
import type { IconName } from '../../../shared/lib/icons';
import { useTheme } from '../../../shared/lib/theme/useTheme';
import { Icon } from '../../../shared/ui/atoms/Icon';
import { toggle } from '../model/burgerSlice';

interface BurgerButtonProps {
  iconName?: IconName;
}

export const BurgerButton = ({
  iconName = 'BurgerMenu-icon',
}: BurgerButtonProps) => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const toggleHandler = () => {
    dispatch(toggle());
  };

  return (
    <div
      onClick={toggleHandler}
      className="burger-button-responsive cursor-pointer"
      aria-label="Toggle burger menu"
    >
      <Icon name={iconName} size={24} fill={theme ? 'black ' : 'white'} />
    </div>
  );
};
