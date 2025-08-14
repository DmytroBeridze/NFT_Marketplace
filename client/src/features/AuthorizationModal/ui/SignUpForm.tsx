import { IoMailOutline } from 'react-icons/io5';
import { GoKey } from 'react-icons/go';
import { GoUnlock } from 'react-icons/go';
import { Button } from '../../../shared/ui/atoms/Button';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Input } from '../../../shared/ui/atoms/Input/Input';
export const SignUpForm = () => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{ userMail: '', userPass: '', userconfirmPass: '' }}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
    >
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          className=" w-full flex  flex-col gap-8 items-center justify-between"
        >
          <Input
            id="mail"
            type="email"
            name="userMail"
            className="w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1"
            placeholder="E-mail"
            autoComplete="email"
            wrapperClass="w-full flex flex-col"
            icon={<IoMailOutline className=" text-gray-400" size={20} />}
            iconPosition="left"
          />
          <Input
            type="password"
            id="pass"
            name="userPass"
            className="w-full border-2 border-gray-300
           rounded-sm h-12 p-2.5 pl-14
           input-focus focus:ring-1"
            placeholder="Password"
            autoComplete="password"
            wrapperClass="w-full flex flex-col"
            icon={<GoKey className=" text-gray-400" size={20} />}
            iconPosition="left"
          />
          <Input
            type="password"
            id="confirmPass"
            name="userconfirmPass"
            className="w-full border-2 border-gray-300
           rounded-sm h-12 p-2.5 pl-14
           input-focus focus:ring-1"
            placeholder="Password"
            autoComplete="password"
            wrapperClass="w-full flex flex-col"
            icon={<GoUnlock className=" text-gray-400" size={20} />}
            iconPosition="left"
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full p-3"
            radius="sm"
          >
            {t('modal.button.JoinNow')}
          </Button>
        </form>
      )}
    </Formik>
  );
};
// import { IoMailOutline } from 'react-icons/io5';
// import { GoKey } from 'react-icons/go';
// import { GoUnlock } from 'react-icons/go';
// import { Button } from '../../../shared/ui/atoms/Button';
// import { useTranslation } from 'react-i18next';
// export const SignUpForm = () => {
//   const { t } = useTranslation();
//   return (
//     <form
//       name="login"
//       id="userLogin"
//       className=" w-full flex  flex-col gap-8 items-center justify-between"
//     >
//       <label htmlFor="mail" className="w-full relative">
//         <IoMailOutline
//           className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400"
//           size={20}
//         />

//         <input
//           type="email"
//           id="mail"
//           name="userMail"
//           className="w-full border-2 border-gray-300
//           rounded-sm h-12 p-2.5 pl-14
//           input-focus"
//           placeholder="E-mail"
//         />
//       </label>
//       <label htmlFor="pass" className="w-full relative">
//         <GoKey
//           className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400"
//           size={20}
//         />
//         <input
//           type="password"
//           id="pass"
//           name="userPass"
//           className="w-full border-2 border-gray-300
//           rounded-sm h-12 p-2.5 pl-14
//           input-focus"
//           placeholder="Password"
//         />
//       </label>
//       <label htmlFor="pass" className="w-full relative">
//         <GoUnlock
//           className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400"
//           size={20}
//         />
//         <input
//           type="password"
//           id="confirmPass"
//           name="userconfirmPass"
//           className="w-full border-2 border-gray-300
//           rounded-sm h-12 p-2.5 pl-14
//           input-focus"
//           placeholder="Confirm Password"
//         />
//       </label>
//       <Button
//         type="submit"
//         variant="primary"
//         className="w-full p-3"
//         radius="sm"
//       >
//         {t('modal.button.JoinNow')}
//       </Button>
//     </form>
//   );
// };
