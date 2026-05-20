import { LangSwitcher } from '../../../features/LangSwitcher';

import ThemeSwitcher from '../../../features/ThemeSwitcher/ui/ThemeSwitcher';

import AuthButton from '../../../features/AuthButton/AuthButton';
import { useNavigate } from 'react-router-dom';
import { useAuthAction } from '../../../shared/lib/hooks';
import { useAppDispatch, useAppSelector } from '../../../app/store/reduxHooks';
import { clearUser } from '../../../entities/user/model';

export const HeaderActions = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  return (
    <section className="hidden navigation-responsive gap-0.5 items-center">
      <ThemeSwitcher />
      <LangSwitcher className="py-2 px-2" hover={false} />

      {/* <AuthButton handler={loginLogoutHandler} /> */}
      <AuthButton
        handler={() => {
          user ? dispatch(clearUser()) : navigate('/auth');
        }}
      />
    </section>
  );
};
