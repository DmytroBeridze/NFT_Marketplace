import { useTheme } from '../../../lib/theme/useTheme';
import { Icon } from '../../atoms/Icon';

interface BurgerButtonProps {
  onClick?: () => void;
}

export const BurgerButton = ({ onClick }: BurgerButtonProps) => {
  const { theme } = useTheme();

  return (
    <div onClick={onClick} className="burger-button-responsive cursor-pointer">
      <Icon
        name="BurgerMenu-icon"
        size={24}
        fill={theme ? 'black ' : 'white'}
      />
    </div>
  );
};
