import { Logo } from '../../../shared/ui/molecules/Logo';
import { Link } from 'react-router-dom';

interface HeaderLogoProps {
  className?: string;
}

export const HeaderLogo = ({ className }: HeaderLogoProps) => {
  return (
    <Link to={'/'} className={`w-fit ${className}`} aria-label="Go to homepage">
      <Logo />
    </Link>
  );
};
