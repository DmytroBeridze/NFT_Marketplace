import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

type FormsName = 'login' | 'signUp';
interface AuthorizationFormsProps {
  name: FormsName;
}

export const AuthorizationForms = ({ name }: AuthorizationFormsProps) => {
  return (
    <div className="p-9">
      {name === 'login' ? <LoginForm /> : <SignUpForm />}
    </div>
  );
};
