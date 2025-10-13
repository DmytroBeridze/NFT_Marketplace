import { GoKey } from 'react-icons/go';
import { PiUser } from 'react-icons/pi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEyeSlash } from 'react-icons/fa6';

import { useTranslation } from 'react-i18next';
import { FormikProvider } from 'formik';

import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Text } from '../../../shared/ui/atoms/Text';
import { QueryStatus } from './QueryStatus';

import {
  getFieldErrorClass,
  useLoginForm,
  usePasswordVisibility,
} from '../lib';
import { useNavigate } from 'react-router-dom';
import { useToggleOverlay } from '../../../shared/ui/molecules/Overlay';
import { useTimeoutAction } from '../../../shared/lib/hooks';
import { Button } from '../../../shared/ui/atoms';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { closeHandler } = useToggleOverlay();
  const { passVisible, togglePasswordVisibility } = usePasswordVisibility();
  const { formik, isLoading, error, data } = useLoginForm();

  // move to userpage
  useTimeoutAction<string | undefined>(
    data?.userData._id,
    () => {
      closeHandler(), navigate('/dashboard');
    },
    1000,
  );
  return (
    /*
     огортаємо в провайдер, бо в кастомному компоненті Input вікористовується 
     хук useField, який бере дані (getFieldProps, errors, touched) з контексту Formik
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
          id="name"
          name="userName"
          type="text"
          className={`w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1 ${getFieldErrorClass(error, 'userName')}`}
          placeholder={t('modal.placeholders.userName')}
          wrapperClass="w-full flex flex-col"
          leftIcon={<PiUser className=" text-gray-400" size={20} />}
          autoComplete="user name"
        />

        <FormikInput
          id="pass"
          name="userPass"
          type={`${passVisible.userPass ? 'text' : 'password'}`}
          className={`w-full border-2 border-gray-300
          rounded-sm h-12 p-2.5 pl-14
          input-focus focus:ring-1 ${getFieldErrorClass(error, 'userPass')}`}
          placeholder={t('modal.placeholders.password')}
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
          variant={isLoading ? 'loading' : 'primary'}
          className={`w-full p-3 `}
          radius="sm"
          disabled={isLoading}
        >
          <Text
            color="static-text-white-color"
            size="t-text-sm"
            font="font-work-sans-regular"
          >
            {t('modal.button.LogInNow')}
          </Text>
        </Button>

        {/*-------- render  messages after request  */}
        <QueryStatus
          message={data?.message}
          error={error}
          isLoading={isLoading}
        />
      </form>
    </FormikProvider>
  );
};
