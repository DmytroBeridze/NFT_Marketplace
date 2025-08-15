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
// export const AuthorizationForms = ({ name }: AuthorizationFormsProps) => {
//   const baseClass =
//     'transition-opacity duration-300 p-9 absolute w-full bg-gray-300';
//   const visibleClass = 'opacity-100 visible pointer-events-auto';
//   const hideClass = 'opacity-0 invisible pointer-events-none';

//   return (
//     <>
//       <div
//         className={`${name === 'login' ? visibleClass : hideClass}
//        ${baseClass}   `}
//       >
//         <LoginForm />
//       </div>

//       <div
//         className={`${name === 'signUp' ? visibleClass : hideClass}
//              ${baseClass}  `}
//       >
//         <SignUpForm />
//       </div>
//     </>
//   );
// };
