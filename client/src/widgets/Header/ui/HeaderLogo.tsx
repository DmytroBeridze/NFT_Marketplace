import { Logo } from '../../../shared/ui/molecules/Logo';
import { Link } from 'react-router-dom';

export const HeaderLogo = () => {
  return (
    <Link to={'/'} className="w-fit" aria-label="Go to homepage">
      <Logo />
    </Link>
  );
};
