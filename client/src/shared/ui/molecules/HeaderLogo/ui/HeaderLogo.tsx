import { Logo } from '../../Logo';
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
