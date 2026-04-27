import type { TextProps } from '../../../atoms/Text/Text.types';
import { Logo } from '../../Logo';
import { Link } from 'react-router-dom';

interface HeaderLogoProps {
  className?: string;
  stacked?: boolean;
  size?: TextProps['size'];
}

export const HeaderLogo = ({ className, stacked, size }: HeaderLogoProps) => {
  return (
    <Link to={'/'} className={`w-fit ${className}`} aria-label="Go to homepage">
      <Logo stacked={stacked} size={size} />
    </Link>
  );
};
