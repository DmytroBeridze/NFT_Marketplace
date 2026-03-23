import { Logo } from '../../Logo';
import { Link } from 'react-router-dom';

interface HeaderLogoProps {
  className?: string;
  responsive?: boolean;
}

export const HeaderLogo = ({ className, responsive }: HeaderLogoProps) => {
  return (
    <Link to={'/'} className={`w-fit ${className}`} aria-label="Go to homepage">
      <Logo responsive={responsive} />
    </Link>
  );
};
