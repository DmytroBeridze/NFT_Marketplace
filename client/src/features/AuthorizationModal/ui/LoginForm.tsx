import { IoMailOutline } from 'react-icons/io5';
import { GoKey } from 'react-icons/go';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEyeSlash } from 'react-icons/fa6';

import { Button } from '../../../shared/ui/atoms/Button';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../shared/ui/atoms/Input/Input';
import { FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
export const LoginForm = () => {
  const { t } = useTranslation();
  const [passVisible, setPassVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPassVisible(!passVisible);
  };

  const formik = useFormik({
    initialValues: {
      userMail: '',
      userPass: '',
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    /*
     огортаємо в провайдер, бо в кастомному компоненті Input вікористовується 
     хук useField, який бере данные (getFieldProps, errors, touched) з контексту Formik
     а при useFormik цей контекст не створюється автоматично
     Тому або використовуємо useFormik і огортаємо в FormikProvider 
    або використовуємо import { Formik } from 'formik
    */

    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className=" w-full flex  flex-col gap-8 items-center justify-between "
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
          leftIcon={
            <IoMailOutline
              className=" text-gray-400"
              // className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400"
              size={20}
            />
          }
          // iconPosition="left"
        />

        <Input
          type={`${passVisible ? 'text' : 'password'}`}
          // type="password"
          id="pass"
          name="userPass"
          className="w-full border-2 border-gray-300
           rounded-sm h-12 p-2.5 pl-14
           input-focus focus:ring-1"
          placeholder="Password"
          autoComplete="password"
          wrapperClass="w-full flex flex-col"
          leftIcon={<GoKey className=" text-gray-400" size={20} />}
          // iconPosition="left"
          rightIcon={
            passVisible ? (
              <FaRegEyeSlash
                size={16}
                className="cursor-pointer text-gray-400"
              />
            ) : (
              <MdOutlineRemoveRedEye
                size={16}
                className="cursor-pointer text-gray-400"
              />
            )
          }
          onRightIconClick={() => togglePasswordVisibility()}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full p-3"
          radius="sm"
        >
          {t('modal.button.LogInNow')}
        </Button>
      </form>
    </FormikProvider>
  );
  // ---------------------
};
// import { IoMailOutline } from 'react-icons/io5';
// import { GoKey } from 'react-icons/go';
// import { Button } from '../../../shared/ui/atoms/Button';
// import { useTranslation } from 'react-i18next';
// import { Input } from '../../../shared/ui/atoms/Input/Input';
// import { Form, Formik, type FormikProps } from 'formik';
// export const LoginForm = () => {
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
//           input-focus focus:ring-1"
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
//           rounded-sm h-12 p-2.5 pl-14 input-focus"
//           placeholder="Password"
//         />
//       </label>

//       <Button
//         type="submit"
//         variant="primary"
//         className="w-full p-3"
//         radius="sm"
//       >
//         {t('modal.button.LogInNow')}
//       </Button>
//       {/* <button type="submit" className=''>Log in now</button> */}
//     </form>
//   );
// };
