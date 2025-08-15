import { IoMailOutline } from 'react-icons/io5';
import { GoKey } from 'react-icons/go';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEyeSlash } from 'react-icons/fa6';

import { useTranslation } from 'react-i18next';
import { FormikProvider, useFormik } from 'formik';

import { Button } from '../../../shared/ui/atoms/Button';
import { usePasswordVisibility } from '../lib/usePasswordVisibility';
import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Text } from '../../../shared/ui/atoms/Text';

export const LoginForm = () => {
  const { t } = useTranslation();
  const { passVisible, togglePasswordVisibility } = usePasswordVisibility();

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
        className=" w-full flex  flex-col gap-6 items-center justify-between "
      >
        <FormikInput
          id="email"
          name="userMail"
          type="email"
          className="w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1 "
          placeholder="E-mail"
          wrapperClass="w-full flex flex-col"
          leftIcon={<IoMailOutline className=" text-gray-400" size={20} />}
          autoComplete="email"
        />
        <FormikInput
          id="pass"
          name="userPass"
          type={`${passVisible.userPass ? 'text' : 'password'}`}
          className="w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1"
          placeholder="Password"
          wrapperClass="w-full flex flex-col"
          leftIcon={<GoKey className=" text-gray-400" size={20} />}
          autoComplete="password"
          rightIcon={
            passVisible.userPass ? (
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
          onRightIconClick={() => togglePasswordVisibility('userPass')}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full p-3"
          radius="sm"
        >
          <Text
            color="static-text-white-color"
            size="t-text-sm"
            font="font-work-sans-regular"
          >
            {t('modal.button.LogInNow')}
          </Text>
        </Button>
      </form>
    </FormikProvider>
  );
};
