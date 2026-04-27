import { LoginForm, SignUpForm } from '../../../features/AuthorizationModal';
import { useAuthorizationContext } from '../../../features/AuthorizationModal/context';

export const Content = () => {
  const { tab } = useAuthorizationContext();

  return (
    <div className=" w-[346px] max-[834px]:w-[100%] pt-4">
      {tab === 'login' ? (
        <LoginForm variant="page" />
      ) : (
        <SignUpForm variant="page" />
      )}
    </div>
  );
};
