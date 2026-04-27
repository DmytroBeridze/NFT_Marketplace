import { LangSwitcher } from '../../../features/LangSwitcher';

import ThemeSwitcher from '../../../features/ThemeSwitcher/ui/ThemeSwitcher';

import AuthButton from '../../../features/AuthButton/AuthButton';
import { useNavigate } from 'react-router-dom';

export const HeaderActions = () => {
  let navigate = useNavigate();

  return (
    <section className="hidden navigation-responsive gap-0.5 items-center">
      <ThemeSwitcher />
      <LangSwitcher className="py-2 px-2" hover={false} />

      <AuthButton handler={() => navigate('/auth')} />
    </section>
  );
};
